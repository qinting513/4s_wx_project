var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  clearCache(){
    wx.clearStorage({
      success: function(){
        wx.showToast({
          title: '清除缓存成功',
          icon: 'success',
          duration: 4000
        })
      }
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  }
})