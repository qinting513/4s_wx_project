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
    if (this.data.flag&&this.data.flag === 'score') {
      const pages = getCurrentPages();             //  获取页面栈
      const currPage = pages[pages.length - 1];    // 当前页面
      const prevPage = pages[pages.length - 2]; 
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
  deleteAddress: function(e){
    let curItem = e.currentTarget.dataset.item
    app.globalData.request.post('/api/address/deleteAddress?id='+ curItem.id).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
      this.getAddress()
    })
  },
  changeDefault:function(e){
    let curItem = e.currentTarget.dataset.item
    app.globalData.request.post('/api/address/setDefault?id='+curItem.id).then(res => {
      this.getAddress()
    })
  },
  getAddress: function () {
    app.globalData.request.post('/api/address/myAddressList').then(res => {
      let tempData = res.data
      let filterDatalist = tempData.filter(item => item.isDefault)
      auth.setStorage('defaultAddress', filterDatalist[0])
      // if (filterDatalist.length === 1) {
      //   tempData[0].isDefault = true
      // }
      this.setData({
        myAddressList: tempData
      }, () => {
        console.log('this.goodListthis.goodList', this.data.myAddressList)
      })
    })
  },
  goOtherFn: function(e) {
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