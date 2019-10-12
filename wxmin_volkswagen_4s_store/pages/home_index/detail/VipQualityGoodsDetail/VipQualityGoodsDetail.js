var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
var WxParse = require('../../../../utils/wxParse/wxParse.js');
Page({
  data: {
    ossImgAddre,
    currentTabInfo: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    piclist: [],
    tabArr: [{ id: 1, text: '商品详情' }, { id: 2, text: '宝贝评价' }],
    goodInfo: '',
    isShowSelGoodsLayer: false,
    goodsDetail: {},
    goodsSkus: [],
    contentInfo: '',
    commetList: [],
    styles: "height: 750rpx"
  },

  clickTabFn: function (e) {
    var that = this;
    const dataset = e.currentTarget.dataset
    that.setData({
      'currentTabInfo': dataset.info
    });
  },
  closeSelGoodsFn: function (e) {
    this.setData({
      isShowSelGoodsLayer: false
    })
  },
  changeDataFn: function (e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      [dataset.key]: dataset.val
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    var that = this;
    console.log("===========> 商品详情 options.id:", options.id);
    app.globalData.request.post('/api/jingpin/getJingpinItemDetail?itemId=' + options.id).then(res => {
      console.log("===========> 商品详情 res：", res);
      if(res && res.code == "200") {
        WxParse.wxParse('contentInfo', 'html', res.data.detail, this, 5);
        that.setData({
          goodsDetail: res.data,
          piclist: res.data.pics.split(';'),
        })    
      }
     
    })
    that.setData({ 'currentTabInfo': that.data.tabArr[0] });
    that.getCommetList(options.id)
    console.log('=======>>', wx.getSystemInfoSync().windowWidth)
  },
  getCommetList(itemId) {
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
 
  callServiceFn: function (e) {
    util.makePhoneCallFn()
  },
  goHomePageFn: function () {
    wx.switchTab({
      url: '../../../home_index/home_index'
    })
  },

})