var app = getApp();
Page({
  data: {
    ossImgAddre: app.globalData.ossImgAddre,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '../../images/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '../../images/location.png'
    }],
    curPosition: "",
    shopInfo: '',
    distanceMile: ''
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onShow: function(){
    this.getUserLocation()
  },
  // getCenterLocation: function () {
  //   let that = this
  //   this.mapCtx.getCenterLocation({
  //     success: function(res){
  //       that.setData({
  //         latitude: res.latitude,
  //         longitude: res.longitude
  //       })
  //       console.log(res.longitude)
  //       console.log(res.latitude)
  //     }
  //   })
  // },
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
  
  //定位方法
getUserLocation: function () {
  var _this = this;
  wx.getSetting({
    success: (res) => {
      // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
      // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
      // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
      if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
        //未授权
        wx.showModal({
          title: '请求授权当前位置',
          content: '需要获取您的地理位置，请确认授权',
          success: function (res) {
            if (res.cancel) {
              //取消授权
              wx.showToast({
                title: '拒绝授权',
                icon: 'none',
                duration: 1000
              })
            } else if (res.confirm) {
              //确定授权，通过wx.openSetting发起授权请求
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //再次授权，调用wx.getLocation的API
                    _this.getLocation();
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              })
            }
          }
        })
      } else if (res.authSetting['scope.userLocation'] == undefined) {
       //用户首次进入页面,调用wx.getLocation的API
        _this.getLocation();
      }
      else {
        console.log('授权成功')
        //调用wx.getLocation的API
        _this.getLocation();
      }
    }
  })

},
qqMapTransBMap(lng, lat) {
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  let x = lng;
  let y = lat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta) + 0.0065;
  let lats = z * Math.sin(theta) + 0.006;
  return {
    longitude: lngs,
    latitude: lats
  }
},
  getLocation: function () {
    var that = this
    let {shopInfo} = app.globalData
    this.setData({
      markers: [{
        id: 1,
        latitude: shopInfo.latitude,
        longitude: shopInfo.longitude,
        name: shopInfo.name
      }]
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let {latitude, longitude} = that.qqMapTransBMap(res.longitude, res.latitude)
        that.setData({
          latitude,
          longitude,
          shopInfo,
          distanceMile: that.GetDistance(latitude, longitude,shopInfo.latitude, shopInfo.longitude )
        }, () => {
          console.log('shopInfoshopInfoshopInfo==>>>', that.data.shopInfo)
          that.getCity(latitude, longitude);
        })
      }
    })
  },
  getCity: function (latitude, longitude) { // 获取城市信息
    var that = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "1G50Crx5QIKWy5o4R5Q1ONFSgmFIxfIR",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street,
          curPosition: city + district + street,
          covers: [{
            latitude,
            longitude,
            iconPath: '../../images/location.png'
          }],
        })
        var descCity = city.substring(0, city.length - 1);
        // that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude:23.10229,
        longitude:113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude:23.10229,
        longitude:113.3345211,
      }, {
        latitude:23.00229,
        longitude:113.3345211,
      }]
    })
  },
  callServiceFn: function(e){
    let {phone} = app.globalData.shopInfo
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})
