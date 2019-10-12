const util = require('../../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    selArea: '',
    region: ['湖南省'],
    phone: '',
    name: '',
    id: ''
  },
  onLoad: function (options) {
    let initAddressData = JSON.parse(options.info)
    this.setData({
      id: initAddressData.id,
      name: initAddressData.name,
      phone: initAddressData.phone,
      address: initAddressData.address,
      province: initAddressData.province,
      city: initAddressData.city,
      county: initAddressData.county,
      isDefault: initAddressData.isDefault,
      selArea: [initAddressData.province,initAddressData.city,initAddressData.county]
    })
  },
  onReady: function () {

  },
  onShow: function () {
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
  deleteAddress: function(){
    let {id} = this.data
    app.globalData.request.post('/api/address/deleteAddress?id='+ id).then(res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack()
    })
  },
  saveAddress: function(){
    let {phone, name, province,city,county, address, id} = this.data
    const params = {
      id,
      name,
      phone,
      province,
      city,
      county,
      address
    }
    app.globalData.request.post('/api/address/saveAddress', params).then(res => {
      wx.showToast({
        title: '修改成功',
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