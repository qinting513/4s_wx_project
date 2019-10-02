var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    carlist: [],
    queryString:{
      // "brandId": '',
      // "setId": '',
      "page": 1,
      "limit": 100
    },
  },
  onLoad: function (options) {
    this.getCarList()
  },
  onReady: function () {

  },
  getCarList(){
    let {queryString} = this.data
    app.globalData.request.post('/api/basic/getHotList', queryString).then(res => {
      this.setData({
        carlist: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.carlist)
      })
    })
  },
  onShow: function () {

  },
  goDetailFn: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../' + util.formatPath('CARDETAIL') + '?id=' + id
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