var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
var day = ["今天","明天","后天"];
const regeneratorRuntime = require('../../utils/runtime')
const {getStorage, getSetting, login, loginWeChat, checkUserAuth, setStorage }  = require('../../utils/auth')
Page({
  data: {
    ossImgAddre,
    isAuthorModel: true
  },
  onLoad: function (options) { // 获取经纬度方法
    // this.getInitData()
    // this.getUserAndShopInfo()
    // checkUserAuth()
  },
  onReady: function () {
    // this.getInitData()
    // this.getUserAndShopInfo()
    this.getInitData()
    this.getUserAndShopInfo()
  },
  onShow: function () {
    //checkUserAuth()
  },
  getUserAndShopInfo(){
    app.globalData.request.post('/api/basic/getShopInfo').then(res => {
      app.globalData.shopInfo = res.data
      setStorage('shopInfo', res.data)
    })
    //app.globalData.request.post('/api/address/myAddressList').then(res => {
      //let tempData = res.data
      //let filterDatalist = tempData.filter(item => item.isDefault)
      //setStorage('defaultAddress', filterDatalist[0])
    //})
  },
  getInitData(){
    app.globalData.request.post('/api/banner/getModuleList?type=1,2,4,5').then(res => {
      if (res) {
        this.setData({
          headBannerList: res.data[0].bannerList || [],
          newsBannerList: res.data[1].bannerList || [],
          adBannerList: res.data[2].bannerList || [],
          newCarBannerList: res.data[3].bannerList || []
        })
      }
    }, error => {
      console.log('errr=========>>>', err)
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