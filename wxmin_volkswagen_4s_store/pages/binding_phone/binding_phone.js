var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const regeneratorRuntime = require('../../utils/runtime')
const auth = require('../../utils/auth.js')
Page({
  data: {
    ossImgAddre,
    isDefault: 0,
    phoneNum: '',
    verifyCode: '',
    flag: false
  },
  isDefaultFn: function() {
    let {isDefault} = this.data;
    if (isDefault === 1) {
      isDefault = 0
    } else {
      isDefault = 1
    }
    this.setData({
      isDefault
    })
  },
  onLoad: function (options) { // 获取经纬度方法
    this.setData({
      flag: options.phone ? true : false
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  bindVerifyNum(e){
    this.setData({
      verifyCode: e.detail.value
    })
  },
  sentMsgVerify(){
    app.globalData.request.post('/api/user/sendsms', {phone: this.data.phoneNum}).then(res => {
      wx.showToast({
        title:'验证码已发送',
        icon: 'none',
        duration: 2000
      })
    })
  },
  bindPhoneNum(e){
    this.setData({
      phoneNum: e.detail.value
    })
  },
  async commitBindPhone(){
    let {phoneNum, verifyCode, flag} = this.data
    let params = {
      phone: phoneNum,
      verifyCode
    }
    await app.globalData.request.post('/api/user/updateUserPhone', params)
    let userInfo = await app.globalData.request.post('/api/user/userInfo')
    console.log('绑定成功后存储userInfo===》', userInfo)
    auth.setStorage('userInfo', userInfo.data).then(res => {
      wx.showToast({
        title:'绑定成功',
        icon: 'success',
        duration: 2000
      })
      if (flag){
        var pages = getCurrentPages();//获取页面栈
        if (pages.length > 1) {
        //上一个页面实例对象
          var prePage = pages[pages.length - 2];
        //调用上一个页面的onShow方法
          prePage.onReady()
        } 
        return wx.navigateBack()
      }
      wx.switchTab({
        url: '/pages/home_index/home_index'
      })
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