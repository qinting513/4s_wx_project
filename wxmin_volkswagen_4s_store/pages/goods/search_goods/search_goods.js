var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [
      {id: 1, text: 'asf萨达是否按时发大水阿萨德'},
      {id: 2, text: '米其林轮胎'},
      {id: 3, text: '汽车机油'},
      {id: 4, text: '保养'},
      {id: 5, text: '酒鬼花生米'},
      {id: 6, text: '男士钱包'}
   ],
   goodsName: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  // bindconfirm(e) {
  //   console.log('e==>>', e)
  // },
  bindconfirm(e){
    this.setData({
      goodsName: e.detail.value
    }, () => {
      wx.navigateTo({
        url: util.formatPath('SEARCHGOODSLIST') + '?searchkey=' + this.data.goodsName
      })
    })
  },
  goBack: function () {
    wx.navigateBack();
  },
  goSearchListFn: function (e) {
    let searchkey = e.currentTarget.dataset.searchkey;
    wx.navigateTo({
      url: util.formatPath('SEARCHGOODSLIST') + '?searchkey=' + searchkey
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