var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    currentTabInfo: '',
    list: [1, 2, 3, 4],
    tabArr: [{id: 1, text: '全部'}, {id: 2, text: '收入'}, {id: 3, text: '支出'}],
    howtoGetIntegralArr: [
      {id: 1, img: 'get_sign_in', title: '每日签到', des: '每天签到轻松领积分', num: '+1'},
      {id: 2, img: 'get_invite_friend', title: '每邀请一位好友', des: '邀请好友轻松领积分', num: '+5'},
      {id: 3, img: 'get_recommend_car', title: '推荐好友购车', des: '邀请好友轻松领积分', num: '+500'},
      {id: 4, img: 'get_maintain_car', title: '定期保养维修装潢', des: '邀请好友轻松领积分', num: '25元=1积分'},
      {id: 5, img: 'get_pay_full', title: '定期保养维修装潢', des: '邀请好友轻松领积分', num: '25元=1积分'},
      {id: 6, img: 'get_repair_car', title: '定期保养维修装潢', des: '邀请好友轻松领积分', num: '500元=1积分'},
      {id: 7, img: 'get_evaluate', title: '厂家满意回访好评', des: '邀请好友轻松领积分', num: '+200'}
    ]
  },
  lowerLogFn: function() {
    console.error('下拉刷新');
  },
  upperLogFn: function() {
    console.error('上拉加载');
  },
  onLoad: function (options) {
    this.setData({
      currentTabInfo: this.data.tabArr[0]
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
    })
  },
  goOtherFn: function(e) {
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: util.formatPath(path)
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