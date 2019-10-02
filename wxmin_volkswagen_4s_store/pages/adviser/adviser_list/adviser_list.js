const util = require('../../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    list: [
      { id: 1, name: '4S店', level: '1', experience: '3', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      { id: 2, name: '4S店', level: '1', experience: '3', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      { id: 3, name: '4S店', level: '1', experience: '3', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      { id: 4, name: '4S店', level: '2', experience: '3', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
    ],
    levelMap: {
      1: '销售顾问',
      2: '服务顾问'
    }
  },
  onLoad: function (options) {
    this.getAdviserList()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  getAdviserList: function(){
    app.globalData.request.post('/api/reservation/adviserList').then(res => {
      this.setData({
        list: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.list)
      })
    })
  },
  goDetailFn: function(e) {
    const path = util.formatPath('ADVISERDETAIL');
    const info = e.currentTarget.dataset.info;
    const params = JSON.stringify(info)
    wx.navigateTo({
      url: path + '?info=' + params
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