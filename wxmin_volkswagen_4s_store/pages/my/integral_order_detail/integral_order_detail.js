var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    integralId: '',
    img: ossImgAddre + 'demo_img/1.jpg',
    storeInfo: '',
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
      integralId: options.id
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