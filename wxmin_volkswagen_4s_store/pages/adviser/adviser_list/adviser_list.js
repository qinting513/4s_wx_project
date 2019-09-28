const util = require('../../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    list: [
      {id: 1, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 3, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 4, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  goDetailFn: function(e) {
    const path = util.formatPath('ADVISERDETAIL');
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: path + '?id=' + id
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