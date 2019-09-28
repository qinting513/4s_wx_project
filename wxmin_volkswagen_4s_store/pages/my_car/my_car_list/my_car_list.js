var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    lists: [
      {id: 1, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 3, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 4, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
    ],
    list: []
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  goAddFn: function(e) {
    const path = util.formatPath('MYCARUPDATE');
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