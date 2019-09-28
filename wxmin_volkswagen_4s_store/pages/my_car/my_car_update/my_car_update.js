var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    detailInfo: {id: 1, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'}
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