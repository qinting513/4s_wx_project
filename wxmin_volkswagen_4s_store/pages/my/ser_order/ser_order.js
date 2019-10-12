var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    currentTab: 1,
    isShowNoMoreData: false,
    isShowNoDataImg: false,
    shopName: '',
    tabArr: [
      {id: 1, text: '全部'},
      {id: 2, text: '未完成'},
      {id: 3, text: '已完成'}
    ],
    list: [
      {id: 1, text: '全部'},
      {id: 2, text: '未完成'},
      {id: 3, text: '已完成'}
    ],
    queryString: {
      "status": 0,
      "page": 1,
      "limit": 10
    },
    typeMap: {
      1: '保养',
      2: '试驾'
    },
    orderStatusMap: {
      1:'待处理',
      2:'已处理',
      3: '已取消'
    }
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {
    this.getOrderList()
  },
  getOrderList: function(){
    let {queryString} = this.data
    app.globalData.request.post('/api/reservation/orderList', queryString).then(res => {
      this.setData({
        integralList: res.data,
        shopName: app.globalData.shopInfo.name
      }, () => {
        console.log('this.goodListthis.goodList', this.data.integralList)
      })
    })
  },
  
  changeTabFn: function(e) {
    const item = e.currentTarget.dataset.item;
    let setStr = 'queryString.status'
    this.setData({
      currentTab: item.id,
      [setStr]: item.id - 1
    }, () => {
      this.getOrderList()
    })
  },
  cancleOrder: function(e){
    wx.showModal({
      title: '提示',
      content: '您确定要取消预约吗？',
      success (res) {
        if (res.confirm) {
          app.globalData.request.post('/api/reservation/cancleReservation?id=' + e.currentTarget.dataset.item.id).then(res => {
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 2000
            })
            this.getOrderList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    let info = '';
    let url  = util.formatPath(path);
    if (dataset.item) {
      info = JSON.stringify(dataset.item);
      url  = util.formatPath(path) + '?info=' + info;
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