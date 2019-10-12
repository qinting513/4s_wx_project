
const util = require('../../../utils/util.js');
const auth = require('../../../utils/auth.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    myAddressList: []
  },
  onLoad: function (options) {
    if (options.flag && options.flag === 'score') {
      // 积分兑换选地址
      this.setData({
        flag: options.flag
      })
    }
  },
  chooseAddressModel: function (e) {
    if (this.data.flag && this.data.flag === 'score') {
      const pages = getCurrentPages();             //  获取页面栈
      const currPage = pages[pages.length - 1];    // 当前页面
      const prevPage = pages[pages.length - 2];
      wx.setStorageSync('defaultAddress', e.currentTarget.dataset.item)
      if (prevPage.data.curAddressModel) {
        prevPage.setData({
          curAddressModel: e.currentTarget.dataset.item
        }, () => {
          wx.navigateBack({
            delta: 1
          })
        })
      }
    }
  },
  onReady: function () {

  },
  onShow: function () {
    this.getAddress()
  },
  deleteAddress: function (e) {
    let curItem = e.currentTarget.dataset.item
    var that = this;
    app.globalData.request.post('/api/address/deleteAddress?id=' + curItem.id).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      });
      var def = wx.getStorageSync("defaultAddress");
      if (def.id == curItem.id) {
        console.log("删除默认地址");
        wx.setStorageSync('defaultAddress', '');
      }
      that.getAddress()
    })
  },
  changeDefault: function (e) {
    let curItem = e.currentTarget.dataset.item
    app.globalData.request.post('/api/address/setDefault?id=' + curItem.id).then(res => {
      this.getAddress()
    });
  },
  getAddress: function () {
    app.globalData.request.post('/api/address/myAddressList').then(res => {
      let tempData = res.data
      let filterDatalist = tempData.filter(item => item.isDefault)
      wx.setStorageSync('defaultAddress', filterDatalist[0])
      this.setData({
        myAddressList: tempData
      }, () => {
        console.log('this.goodListthis.goodList', this.data.myAddressList)
      })
    })
  },
  goOtherFn: function (e) {
    const dataset = e.currentTarget.dataset;
    const path = util.formatPath(dataset.path);
    let url = path
    const info = dataset.info;
    if (dataset.info) {
      url = path + '?info=' + JSON.stringify(info)
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