var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
const {getStorage, getSetting, login, loginWeChat, checkUserAuth, setStorage }  = require('../../../utils/auth.js')
Page({
  data: {
    ossImgAddre,
    id: '',
    img: ossImgAddre + 'banner/sharebg.jpg',
    list: [],
    goodInfo: '',
    curQrCode: ''
  },
  getDetailInfo: function () {
    app.globalData.request.post('/api/basic/getHotModelDetail?hotId='+this.data.id).then(res => {
      this.setData({
        goodInfo: res.data,
        list: res.data.pics.split(',')
      }, () => {
        console.log('this.goodListthis.goodList', this.data.goodInfo)
      })
    })
  },
  goMapStoreFn: function() {
    const {id} = this.data;
    wx.navigateTo({
      url: '../' + util.formatPath('RESCUEINDEX') + '?id=' + id
    })
  },
  goBookCarFn: function() {
    const {id} = this.data;
    wx.navigateTo({
      url: '../../' + util.formatPath('CARDETAILBOOKTESTDRIVE') + '?id=' + id
    })
  },
  getUserAndShopInfo(){
    app.globalData.request.post('/api/basic/getShopInfo').then(res => {
      app.globalData.shopInfo = res.data
      setStorage('shopInfo', res.data)
    })
    app.globalData.request.post('/api/address/myAddressList').then(res => {
      let tempData = res.data
      let filterDatalist = tempData.filter(item => item.isDefault)
      setStorage('defaultAddress', filterDatalist[0])
    })
  },
  getQrCode(){
    const p = getCurrentPages()
    let route = p.pop().__route__
    let curUrl = route + "?id=" + this.data.id
    console.log('route==>>', curUrl)
    app.globalData.request.post('api/qrcode/getQrCode?url=/'+curUrl).then(res => {
      console.log('res====>>', res)
      this.setData({
        curQrCode: res.data
      })
    })
  },
  goCreatPosterFn: function() {
    const {goodInfo, list, curQrCode} = this.data;
    wx.navigateTo({
      url: '../../' + util.formatPath('CARPOSTER') + '?sn=' + goodInfo.id +'&curQrCode='+ curQrCode + '&list=' + JSON.stringify(list)
    })
  },
  callServiceFn: function(e){
    util.makePhoneCallFn()
  },
  onLoad: function (options) {
    if (options.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(options.scene);
      console.log("scene is ", scene);
      var tempParams = scene.split("?")[1]
      var arrPara = tempParams.split("&");
      var arr = [];
      for (var i in arrPara) {
        arr = arrPara[i].split("=");
        if (arr[0] === 'id') {
          this.setData({
            id: arr[1]
          })
        }
      }
    } else {
      this.setData({
        id: options.id
      }, () => {
        this.getDetailInfo()
        this.getQrCode()
        // this.getUserAndShopInfo()
      })
    }
  },
  onReady: function () {
    this.getDetailInfo()
    this.getQrCode()
    this.getUserAndShopInfo()
  },
  onShow: function () {
    checkUserAuth()
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