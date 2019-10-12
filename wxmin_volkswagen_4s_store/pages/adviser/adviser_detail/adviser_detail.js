var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'banner/zhuanshuguwen.png',
    detailInfo: {id: 1, name: '4S', level: '1', experience: '3', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
    levelMap: {
      1: '销售顾问',
      2: '服务顾问'
    }
  },
  onLoad: function (options) {
    this.setData({
      detailInfo: JSON.parse(options.info)
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.detailInfo.phone,
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