var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const auth = require('../../../utils/auth');
const regeneratorRuntime = require('../../../utils/runtime')
Page({
  data: {
    ossImgAddre,
    integralId: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    shopInfo: '',
    userInfo: {
      realName: '',
      phone: ''
    },
    orderDetail: {
      orderNum: 'BY001219042010086',
      orderState: '已接单',
      connextNum: '嗨皮哥',
      connextPho: '1852688852',
      carSize: '奔驰CLE',
      carNum: '湘AZM520'
    },
    orderId: '',
    isShowEvaluate: false
  },
  onLoad: function (options) {
    console.log('globalDataglobalDataglobalData==>', app.globalData)
    this.setData({
      integralId: options.id,
      shopInfo: app.globalData.shopInfo
    }, (err) => {
      this.getDetailInfo()
    })
    console.log('shopInfo=', this.data.shopInfo)
  },
  getDetailInfo: async function() {
    let userInfo = await auth.getStorage('userInfo')
    app.globalData.request.post('/api/scoreItem/orderDetail?orderId='+this.data.integralId).then(res => {
      console.log('res=', res)
      let tempData = res.data
      if (tempData.tprice == null) {
        tempData.tprice = 0
      }
      tempData['realName'] = userInfo.data.realName
      tempData['phone'] = userInfo.data.phone
      this.setData({
        orderDetail: tempData
      }, () => {
        console.log('orderDetail=', this.data.orderDetail)
      })
    }).catch(e => {
      console.log
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
            that.getDetailInfo()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  commentOrder: function(e){
    console.log('eee====>>', e)
    this.setData({
      isShowEvaluate: true,
      orderId: e.currentTarget.dataset.item.id
    }, () => {
      console.log('===============>>>', this.data.isShowEvaluate)
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
            that.getDetailInfo()
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
      this.getDetailInfo()
    })
  },
  callServiceFn: function(e){
    let {phone} = app.globalData.shopInfo
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onReady: function () {
  },
  onShow: function () {

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