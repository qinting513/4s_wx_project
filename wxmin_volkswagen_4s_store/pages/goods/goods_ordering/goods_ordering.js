var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    num: 1,
    currentTabInfo: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    tabArr: [{id: 1, text: '商品详情'}, {id: 2, text: '商品评价'}],
    goodInfo: '<img src='+ ossImgAddre+'demo_img/1.jpg />',
    isShowSelGoodsLayer: false
  },
  optionNumFn: function(e) {
    const opt = Number(e.currentTarget.dataset.opt);
    if (opt < 0 && this.data.num === 1) return;
    this.setData({
      num: this.data.num + opt
    })
  },
  onLoad: function (options) {
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