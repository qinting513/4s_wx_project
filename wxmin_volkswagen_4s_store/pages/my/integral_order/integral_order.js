var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    isShowNoMoreData: false,
    isShowNoDataImg: false,
    currentTab: 0,
    isShowEvaluate: false,
    shopInfo: app.globalData.shopInfo,
    tabArr: [
      {id: 0, text: '全部'},
      {id: 1, text: '未完成'},
      {id: 2, text: '已完成'}
    ],
    list: [
      {id: 1, text: '全部'},
      {id: 2, text: '未完成'},
      {id: 3, text: '已完成'}
    ],
    integralList: [],
    queryString: {
      "status": 0,
      "page": 1,
      "limit": 10
    },
    orderMap: {
      1:'待支付',
      2:'待取货',
      3:'待收货',
      4:'待评价',
      5:'已完成'      
    },
    orderStatusMap: {
      1:'待支付',
      2:'待取货',
      3:'待收货',
      4:'已完成',
      5:'已取消'
    },
    orderId: ''
  },
  onLoad: function (options) {
    this.setData({
      integralId: options.id,
      shopInfo: app.globalData.shopInfo
    })
  },
  onReady: function () {

  },
  onShow: function () {
    this.getIntegralList()
  },
  getIntegralList: function(){
    let {queryString} = this.data
    app.globalData.request.post('/api/scoreItem/orderList', queryString).then(res => {
      this.setData({
        integralList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.integralList)
      })
    })
  },
  
  changeTabFn: function(e) {
    const item = e.currentTarget.dataset.item;
    let str = 'queryString.status'
    this.setData({
      currentTab: item.id,
      [str]: item.id
    }, () => {
      this.getIntegralList()
    })
  },
  closeEvaluate(){
    this.setData({
      isShowEvaluate: false,
      orderId: ''
    })
  },
  commitReceive: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定已经收到货物？',
      success (res) {
        if (res.confirm) {
          app.globalData.request.post('/api/scoreItem/receiveOrder?id=' + e.currentTarget.dataset.item.id).then(res => {
            wx.showToast({
              title: '确认收货成功',
              icon: 'success',
              duration: 2000
            })
            that.getIntegralList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  commentOrder: function(e){
    this.setData({
      isShowEvaluate: true,
      orderId: e.currentTarget.dataset.item.id
    })
  },
  cancleOrder: function(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定要取消订单吗？',
      success (res) {
        if (res.confirm) {
          app.globalData.request.post('/api/scoreItem/cancelOrder?id=' + e.currentTarget.dataset.item.id).then(res => {
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 2000
            })
            that.getIntegralList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  closeEvaluate: function(){
    this.setData({
      isShowEvaluate: false
    }, () => {
      this.getIntegralList()
    })
  },
  callServiceFn: function(e){
    let {phone} = app.globalData.shopInfo
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  goDetailFn: function(e) {
    const dataset = e.currentTarget.dataset
    const path = dataset.path;
    let id = '';
    let url  = util.formatPath(path);
    if (dataset.id) {
      id = dataset.id;
      url  = util.formatPath(path) + '?id=' + id;
    }
    console.log('id=', id)
    wx.navigateTo({
      url
    })
  },
  // openEvaluate: function(e){
  //   const val = e.currentTarget.dataset.item;
  //   this.setData({
  //     isShowEvaluate: val
  //   })
  // },
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