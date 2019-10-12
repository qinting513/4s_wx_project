var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    detailInfo: {id: 1, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
    imgList: [
      {id: 1, img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, img: ossImgAddre + 'demo_img/2.jpg'},
      {id: 3, img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 4, img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 5, img: ossImgAddre + 'demo_img/1.jpg'},
    ],
    list: [
      {id: 1, title: '电动车请注意，交警已经盯上了你！', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, title: '今天刷爆朋友圈的“黑洞”，一起来认识它。', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 3, title: '本周油价又要涨了？原油价格震荡造成', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 4, title: '爱车油表显示“0”时，到底还能跑多远？', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 5, title: '想买心爱的车咋这么难？！这里的小妙招了解下吧~', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
    ],
    infoDetail: {},
    praiseInfo: {},
    id: '',
    contentInfo: ''
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getDetailData()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  getDetailData: function () {
    app.globalData.request.post('/api/information/detail?id=' + this.data.id).then(res => {
      WxParse.wxParse('contentInfo', 'html', res.data.content, this, 5);
      this.setData({
        infoDetail: res.data,
        imgList: res.data.praiseImgList.split(',')
      }, () => {
        console.log('imgListimgListimgList', this.data.imgList)
      })
    })
  },
  givePraise: function () {
    app.globalData.request.post('/api/information/praise?id=' + this.data.id).then(res => {
      this.getDetailData()
    })
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