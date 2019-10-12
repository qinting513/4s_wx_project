const util = require('../../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    selArea: '',
    region: ['湖南省'],
    phone: '',
    addressInfo: {},
    name: '',
    address: ''
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  importWXAddress: function () {
    let that = this
    wx.chooseAddress({
      success (res) {
        that.setData({
          name: res.userName,
          phone: res.telNumber,
          selArea: res.provinceName + res.cityName + res.countyName,
          province: res.provinceName,
          city: res.cityName,
          county: res.countyName,
          address: res.detailInfo
        })
      }
    })
  },
  changeName: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  changePhone: function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  changeAddress: function(e){
    this.setData({
      address: e.detail.value
    })
  },

  bindRegionChange: function(e){
    this.setData({
      province: e.detail.value[0],
      city: e.detail.value[1],
      county: e.detail.value[2],
      selArea: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
  },
  submitAddress: function(){
    let {phone, name, province,city,county, address} = this.data
    const params = {
      id: '',
      isDefault: false,
      name,
      phone,
      province,
      city,
      county,
      address
    }
    app.globalData.request.post('/api/address/saveAddress', params).then(res => {
      console.log('res===>>>', res)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack()
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