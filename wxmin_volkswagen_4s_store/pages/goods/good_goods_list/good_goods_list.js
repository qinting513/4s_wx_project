var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    currentTab: ''
  },
  onLoad: function (options) {
    this.changeTabFn(0)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  goSearchFn: function() {
    wx.navigateTo({
      url: '../' + util.formatPath('SEARCHGOODS')
    })
  },
  changeTabFn: function(e) {
    let currentTab = e
    if (e.currentTarget) {
      currentTab = e.currentTarget.dataset.id
    }
    this.setData({
      currentTab
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