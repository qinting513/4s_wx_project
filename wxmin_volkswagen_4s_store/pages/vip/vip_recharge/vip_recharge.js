var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    ossImgAddre,
    discountPackage: [],
    curIndex: -1,
    rechargeItemId: ''
  },
  onLoad: function (options) { // 获取经纬度方法
    
  },
  onReady: function () {

  },
  bindPackage(e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index,
      rechargeItemId: e.currentTarget.dataset.id,
      type: 1,
      chargeNum: '',
      money: e.currentTarget.dataset.money
    })
  },
  printChargeNum(e) {
    this.setData({
      type: 2,
      chargeNum: e.detail.value,
      money: e.detail.value,
      curIndex: -1,
      rechargeItemId: ''
    })
  },
  getChargeList: function () {
    app.globalData.request.post('/api/order/rechargeItemList').then(res => {
      this.setData({
        discountPackage: res.data
      }, () => {
        console.log('======>', this.data.discountPackage)
      })
    })
  },
  getMyInfo: function () {
    app.globalData.request.post('/api/user/userInfo').then(res => {
      app.globalData.activeScore = res.data.activeScore
    })
  },
  chargeVip(){
    let {type, money, rechargeItemId} = this.data
    let that = this
    let params = {
      type,
      money,
      rechargeItemId
    }
    app.globalData.request.post('/api/member/recharge', params).then(res => {
      let payData =  res.data
      wx.requestPayment({
        timeStamp: payData.timeStamp,
        nonceStr: payData.nonceStr,
        package: payData.package,
        signType: payData.signType,
        paySign: payData.paySign,
        success (res) {
          wx.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 2000
          })
          that.getMyInfo()
          wx.navigateBack()
        },
        fail (res) {
          wx.showToast({
            title: '充值失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  },
  onShow: function () {
    this.getChargeList()
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