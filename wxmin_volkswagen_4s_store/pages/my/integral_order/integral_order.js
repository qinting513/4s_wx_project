var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    isShowNoMoreData: false,
    isShowNoDataImg: false,
    currentTab: 1,
    tabArr: [
      {id: 1, text: '全部'},
      {id: 2, text: '未完成'},
      {id: 3, text: '已完成'}
    ],
    list: [
      {id: 1, text: '全部'},
      {id: 2, text: '未完成'},
      {id: 3, text: '已完成'}
    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  changeTabFn: function(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      currentTab: item.id
    })
  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
    })
  },
  goDetailFn: function(e) {
    const dataset = e.currentTarget.dataset
    const path = dataset.path;
    let id = '';
    let url  = util.formatPath(path);
    if (dataset.id) {
      id = dataset.id;
      url  = util.formatPath(path) + '?id=' + id;
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