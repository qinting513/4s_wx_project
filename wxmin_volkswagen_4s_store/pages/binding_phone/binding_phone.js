var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    ossImgAddre,
    isDefault: 0,
    phoneNum: ''
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
    
  },
  onReady: function () {

  },
  onShow: function () {

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