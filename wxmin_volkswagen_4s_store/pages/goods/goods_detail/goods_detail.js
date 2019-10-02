var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({
  data: {
    ossImgAddre,
    currentTabInfo: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    piclist: [],
    tabArr: [{id: 1, text: '商品详情'}, {id: 2, text: '商品评价'}],
    goodInfo: '',
    isShowSelGoodsLayer: false,
    goodsDetail: {},
    goodsSkus: [],
    contentInfo: '',
    commetList: [],
    styles: "height: 750rpx"
  },
  goSearchFn: function() {
    wx.navigateTo({
      url: '../' + util.formatPath('SEARCHGOODS')
    })
  },
  clickTabFn:function(e){
    var that = this;
    const dataset = e.currentTarget.dataset
		that.setData({
      'currentTabInfo': dataset.info
    });
  },
  closeSelGoodsFn: function(e) {
    // const detail = e.detail.currentTarget.dataset;
    this.setData({
      isShowSelGoodsLayer: false
    })
  },
  changeDataFn: function(e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      [dataset.key]: dataset.val
    })
  },
  onLoad: function (options) {
    var that = this;
    app.globalData.request.post('/api/scoreItem/getItemDetail?itemId='+options.id).then(res => {
      WxParse.wxParse('contentInfo', 'html', res.data.detail, this, 5);
      this.setData({
        goodsDetail: res.data,
        piclist: res.data.pics.split(';'),
      }, () => {
        console.log('this.goodListthis.goodList', this.data.goodsDetail)
      })
    })
    that.setData({'currentTabInfo': that.data.tabArr[0]});
    this.getCommetList(options.id)
    console.log('=======>>', wx.getSystemInfoSync().windowWidth)
  },
  getCommetList(itemId){
    let params = {
      itemId,
      page: 1,
      limit: 100
    }
    app.globalData.request.post('/api/scoreItem/commentList', params).then(res => {
      this.setData({
        commetList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.commetList)
      })
    })
  },
  buyByScore() {
    
  },
  goVipRiseFn: function() {
    wx.navigateTo({
      url: '../../vip/' + util.formatPath('VIPLEVELRISE')
    });
  },
  callServiceFn: function(e){
    util.makePhoneCallFn()
  },
  goHomePageFn: function(){
    wx.switchTab({
      url: '../../home_index/home_index'
    })
  },
  onReady: function () {

  },
  onShow: function (option) {
    
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