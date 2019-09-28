const util = require('../../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    list: [1, 2, 3, 4]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  goOtherFn: function(e) {
    const dataset = e.currentTarget.dataset;
    const path = util.formatPath(dataset.path);
    let url = path
    const id = dataset.id;
    if (dataset.id) {
      url = path + '?id=' + id
    }
    wx.navigateTo({
      url
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