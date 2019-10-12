var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4]
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {
    this.getHotCarList()
  },
  getHotCarList: function () {
    let params = {
      // "brandId": 101,
      // "setId": 12,
      "page": 1,
      "limit": 10
  }
    app.globalData.request.post('/api/basic/getHotList', params).then(res => {
      this.setData({
        list: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.list)
      })
    })
  },
  goDetailFn: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../car/' + util.formatPath('CARDETAIL') + '?id=' + id
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