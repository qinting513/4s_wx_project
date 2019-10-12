var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    currentTab: 0,
    queryString: {
      name: '',
      categoryId: '',
      page: 1,
      limit: 10000
    },
    curImg: 0
  },
  onLoad: function (options) {
    // this.changeTabFn()
  },
  onReady: function () {

  },
  onShow: function () {
    this.getBannerList()
    this.getCategoryList()
    this.getGoodList()
  },
  goSearchFn: function() {
    wx.navigateTo({
      url: '../' + util.formatPath('SEARCHGOODS')
    })
  },
  changeTabFn: function(e) {
    const curStr = 'queryString.categoryId'
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      [curStr]: e.currentTarget.dataset.id,
      curImg: this.data.categoryList[e.currentTarget.dataset.index].img
    }, () => {
      this.getGoodList()
    })
  },
  getBannerList() {
    console.log('======>', this.data.imageList);
    app.globalData.request.post('/api/banner/getModuleList?type=6').then(res => {
      this.setData({
        imageList: res.data[0].bannerList
      }, () => {
        console.log('======>', this.data.imageList)
      })
    })
  },
  getCategoryList() {
    app.globalData.request.post('/api/scoreItem/categoryList').then(res => {
      this.setData({
        categoryList: res.data,
        curImg: (res.data)[0].img
      }, () => {
        console.log('======>', this.data.categoryList)
      })
    })
  },
  getGoodList(){
    let {queryString} = this.data
    app.globalData.request.post('/api/scoreItem/itemList', queryString).then(res => {
      this.setData({
        integralList: res.data
      }, () => {
        console.log('======>', this.data.integralList)
      })
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