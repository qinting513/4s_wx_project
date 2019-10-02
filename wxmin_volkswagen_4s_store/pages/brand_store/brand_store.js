var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'banner/mendian-banner.png',
    storeList: [
      {id: 1, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店', img:ossImgAddre + 'demo_img/1.jpg'},
    ],
    distanceMile: ''
  },
  onLoad: function (options) {
    this.getLocation()
    // this.getBrandStore()
  },
  onReady: function () {
  },
  onShow: function () {

  },
  Rad:function(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
  },
  GetDistance: function (lat1,lng1,lat2,lng2){
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    s.toFixed(2)
    return s;
  },
  getLocation: function () {
    var that = this
    let {shopInfo} = app.globalData
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        }, () => {
          that.getBrandStore()
        })
        // that.getCity(latitude, longitude);
      }
    })
  },
  openNavTo(e){
    let {latitude,longitude, address } = e.currentTarget.dataset.item
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name:address,
      scale: 28
     })
  },
  getBrandStore() {
    let {latitude,longitude } = this.data
    app.globalData.request.post('/api/basic/getShopInfo').then(res => {
      let curStoreList = [res.data]
      let hasDistanceList = curStoreList.map(item => {
        item.distanceMiles = this.GetDistance(item.latitude, item.longitude,latitude, longitude)
        return item
        })
      this.setData({
        storeList: hasDistanceList
      }, () => {
        console.log('this.goodListthis.goodList', this.data.storeList)
      })
    })
  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
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