var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const regeneratorRuntime = require('../../../utils/runtime')
const {getStorage} = require('../../../utils/auth')
Page({
  data: {
    ossImgAddre,
    isActive: false,
    img: ossImgAddre + 'demo_img/1.jpg',
    seriesList: [],
    carPic: '',
    setId: '',
    "remark": "",
    "plateNo": "",
    "buyDate": "",
    "mileage": '',
    "vin": "",
    brandId: '',
    "carPic": "",
    detailInfo: {id: 1, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'}
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.getSeriesList()
  },
  changePlateNo:function(e){
    this.setData({
      plateNo: e.detail.value
    }, () => {
      this.isFieldEnd()
    })
  },
  changeMileage:function(e){
    this.setData({
      mileage: e.detail.value
    }, () => {
      this.isFieldEnd()
    })
  },
  changeVin:function(e){
    this.setData({
      vin: e.detail.value
    }, () => {
      this.isFieldEnd()
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
        that.uploadCarPic(that, tempFilePaths);
      }
    })
  },
  uploadCarPic: async function(page, path) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    let data = await getStorage('token')
    wx.uploadFile({
      url: require('../../../utils/config').baseUrl + '/api/upload/file',
      filePath: path[0], 
      name: 'file',
      header: { "Content-Type": "multipart/form-data", "token":  data.data},
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
        var data = res.data
        page.setData({  //上传成功修改显示头像
          carPic: path[0]
        }, () => {
          page.isFieldEnd()
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
  bindPickeCarSeriesFn: function (e) {
    const index = e.detail.value;
    const {seriesList} = this.data;
    this.setData({
      selSeries: seriesList[index],
      brandId: seriesList[index].brandId,
      setId: seriesList[index].id
    }, () => {
      this.isFieldEnd()
    })
  },
  bindDateChange: function(e){
    const curDate = e.detail.value;
    this.setData({
      selDate: curDate,
      buyDate: curDate
    }, () => {
      this.isFieldEnd()
    })
  },
  getSeriesList: function () {
    app.globalData.request.post('/api/basic/getSetInfo?brandId=').then(res => {
      this.setData({
        seriesList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.seriesList)
      }, () => {
        this.isFieldEnd()
      })
    })
  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
    })
  },
  isFieldEnd(){
    let {plateNo,buyDate, mileage, vin, carPic, brandId, setId } = this.data
    if (plateNo && buyDate && mileage && vin && carPic && brandId && setId) {
      this.setData({
        isActive: true
      })
    }
  },
  goAddFn: function(){
    let {plateNo,buyDate, mileage, vin, carPic, brandId, setId,remark } = this.data
    let params = {
      id: '',
      brandId,
      setId,
      remark,
      plateNo: '湘'+ plateNo,
      buyDate,
      mileage,
      vin,
      carPic
    }
    // console.log('paramsparamsparams==>>', params)
    app.globalData.request.post('/api/car/saveMycar', params).then(res => {
      wx.showToast({
        title: '添加成功',
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