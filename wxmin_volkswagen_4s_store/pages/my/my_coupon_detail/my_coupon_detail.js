var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    info: {},
    img: ossImgAddre + 'demo_img/1.jpg',
  },
  onLoad: function (options) {
    this.setData({
      info: JSON.parse(options.info)
    })
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