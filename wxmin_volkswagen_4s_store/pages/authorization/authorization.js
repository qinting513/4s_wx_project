// pages/authorization/authorization.js
const {getStorage, getSetting, login}  = require('../../utils/auth')
const regeneratorRuntime = require('../../utils/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false
  },
  onGotUserInfo (e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      this.checkUserAuth()
      // this.setData({
      //   isAuth: false
      // })
    } else {
            getApp().globalData.isAuth = 0;
      wx.navigateBack()
      // this.setData({
      //   isAuth: true
      // })
    }
  },
  checkUserAuth: async function () {
    console.log('检查是否有授权')
    // let this_ = this
    // 判断是否获取授权
    let getSettingInfo = await getSetting()
    // 有授权就登录
    if (getSettingInfo.authSetting['scope.userInfo']) {
      console.log('有授权，去登录')
      // this_.isAuth = false
      login()
    } else {
      console.log('没有授权，去授权')
      // this_.isAuth = true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})