var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    shopInfo: {},
    orderDetail: {
      orderNum: 'BY001219042010086',
      orderState: '已接单',
      connextNum: '嗨皮哥',
      connextPho: '1852688852',
      carSize: '奔驰CLE',
      carNum: '湘AZM520'
    }
  },
  onLoad: function (options) {
    this.setData({
      orderDetail: JSON.parse(options.info),
      shopInfo: app.globalData.shopInfo
    })
    console.log('shopInfoshopInfo==>>', app.globalData.shopInfo)
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
            this.getDetailInfo()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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