var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  goDetailFn: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../' + util.formatPath('CARDETAIL') + '?id=' + id
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