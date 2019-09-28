var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    tabArr: [
      {id: 1, img: ossImgAddre + 'my/base_car.png', text: '我的车辆', path: 'MYMYCAR'},
      {id: 2, img: ossImgAddre + 'my/base_order.png', text: '服务订单', path: 'SERORDER'},
      {id: 3, img: ossImgAddre + 'my/base_integral.png', text: '积分订单', path: 'INTEGRALORDER'},
      {id: 4, img: ossImgAddre + 'my/base_adviser.png', text: '专属顾问', path: 'MyADVISERINDEX'}
    ],
    vipToolArr: [
      {id: 1, img: ossImgAddre + 'my/vip_tool_invite.png', text: '邀请好友', path: 'INVITEFRIENDS'},
      {id: 2, img: ossImgAddre + 'my/vip_tool_address_black.png', text: '地址管理', path: 'MYADDRESSLIST'},
      {id: 3, img: ossImgAddre + 'my/vip_tool_store.png', text: '专属门店', path: 'ADVISERINDEX'},
      {id: 4, img: ossImgAddre + 'my/vip_tool_complaint.png', text: '投诉建议', path: 'COMPLAINTSUGGESTION'},
      {id: 5, img: ossImgAddre + 'my/vip_tool_accpunt_set.png', text: '账号设置', path: 'ACCOUNTSET'}
    ]
  },
  onLoad: function (options) {

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
  goOtherModelFn: function(e) {
    const dataset = e.currentTarget.dataset
    const path = dataset.path;
    const pathForce = dataset.pathforce;
    wx.navigateTo({
      url: pathForce + util.formatPath(path)
    });
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