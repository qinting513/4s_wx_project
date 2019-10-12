var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
const regeneratorRuntime = require('../../../utils/runtime')
const {getStorage} = require('../../../utils/auth')
Page({
  data: {
    ossImgAddre,
    avatar: ossImgAddre + 'demo_img/1.jpg',
    myCarArr: [1],
    myInfoData: {
      img: '',
      nickName: '',
      realName: '',
      phone: ''
    }
  },
  onLoad: function (options) {
  },
  getMyInfo:function(){
    app.globalData.request.post('/api/user/userInfo').then(res => {
      this.setData({
        myInfoData: res.data,
        avatar: res.data.img
      }, () => {
        console.log('this.goodListthis.goodList', this.data.myInfoData)
      })
    })
  },
  uploadPhoto() {
    var that = this; 
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.upload(that, tempFilePaths);
      }
    })
  },
  upload: async function(page, path) {
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      })
      let data = await getStorage('token')
      wx.uploadFile({
        url: require('../../../utils/config').baseUrl + '/api/upload/file',
        filePath: path[0], 
        name: 'file',
        header: { "Content-Type": "multipart/form-data", "token": data.data },
        formData: {
        },
        success: function (res) {
          if (res.statusCode != 200) { 
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          var data = JSON.parse(res.data)
          const avatarStr = 'myInfoData.img'
          page.setData({  //上传成功修改显示头像
            [avatarStr]: data.msg,
            avatar: path[0]
          }, () => {
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
    },
  onReady: function () {
  },
  onShow: function () {
    this.getMyInfo()
    this.getDefaultCarInfo()
  },
  bindInputNickNmae: function(e){
    console.log('eeee===>>', e)
    const curStr = 'myInfoData.nickName'
    this.setData({
      [curStr]: e.detail.value
    })
  },
  bindInputRealName: function(e){
    const curStr = 'myInfoData.realName'
    this.setData({
      [curStr]: e.detail.value
    })
  },
  bindInputPhone: function(e){
    wx.navigateTo({
      url: '/pages/binding_phone/binding_phone?phone=' + e.currentTarget.dataset.phone
    })
  },
  getDefaultCarInfo: function(){
    app.globalData.request.post('/api/car/myCarList').then(res => {
      this.setData({
        carInfo: res.data[0]
      }, () => {
        console.log('this.goodListthis.goodList', this.data.carInfo)
      })
    })
  },
  callServiceFn: function(e){
    let {phone} = app.globalData.shopInfo
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  saveMyInfo: function() {
    let {img, nickName, realName, phone} = this.data.myInfoData
    let params = {
      img,
      nickName,
      realName,
      phone
    }
    console.log('myInfoDatamyInfoDatamyInfoData==>>', params)
    app.globalData.request.post('/api/user/updateUserInfo', params).then(res => {
      wx.showToast({
        title: '更新成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack()
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})