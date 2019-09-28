var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    currentTabInfo: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    tabArr: [{id: 1, text: '商品详情'}, {id: 2, text: '商品评价'}],
    goodInfo: '<img src='+ ossImgAddre+'demo_img/1.jpg />',
    isShowSelGoodsLayer: false
  },
  goSearchFn: function() {
    wx.navigateTo({
      url: '../' + util.formatPath('SEARCHGOODS')
    })
  },
  clickTabFn:function(e){
    var that = this;
    const dataset = e.currentTarget.dataset
		that.setData({
      'currentTabInfo': dataset.info
    });
  },
  closeSelGoodsFn: function(e) {
    const detail = e.detail.currentTarget.dataset;
    this.setData({
      [detail.key]: detail.val
    })
  },
  changeDataFn: function(e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      [dataset.key]: dataset.val
    })
  },
  onLoad: function (options) {
    var that = this;
  	that.setData({'currentTabInfo': that.data.tabArr[0]});
  },
  goVipRiseFn: function() {
    wx.navigateTo({
      url: '../../vip/' + util.formatPath('VIPLEVELRISE')
    });
  },
  callServiceFn: function(e){
    util.makePhoneCallFn()
  },
  goHomePageFn: function(){
    wx.switchTab({
      url: '../../home_index/home_index'
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