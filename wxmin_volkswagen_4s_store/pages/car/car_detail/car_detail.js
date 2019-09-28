var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    id: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    goodInfo: '<img src='+ ossImgAddre+'demo_img/1.jpg />',
  },
  goMapStoreFn: function() {
    const {id} = this.data;
    wx.navigateTo({
      url: '../' + util.formatPath('RESCUEINDEX') + '?id=' + id
    })
  },
  goBookCarFn: function() {
    const {id} = this.data;
    wx.navigateTo({
      url: '../../' + util.formatPath('CARDETAILBOOKTESTDRIVE') + '?id=' + id
    })
  },
  goCreatPosterFn: function() {
    const {id, img} = this.data;
    wx.navigateTo({
      url: '../../' + util.formatPath('CARPOSTER') + '?sn=' + id + '&carDetailImg=' + img
    })
  },
  callServiceFn: function(e){
    util.makePhoneCallFn()
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
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