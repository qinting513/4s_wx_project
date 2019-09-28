var app = getApp();
const util = require('../../../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  data: {
    ossImgAddre: app.globalData.ossImgAddre
  },
  ready() {
    var that = this;
    that.getLocation();
  },
  methods: {
    goSearchFn: function() {
        wx.navigateTo({
          url: '../../../../goods/' + util.formatPath('SEARCHGOODS')
        })
    },
    getLocation: function () {
      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          console.log("lat:" + latitude + " lon:" + longitude);
   
          that.getCity(latitude, longitude);
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
          var result = res.data.result;
          if (result){
            var city = res.data.result.addressComponent.city;
            var district = res.data.result.addressComponent.district;
            var street = res.data.result.addressComponent.street;

            that.setData({
              city: city,
              district: district,
              street: street,
            })

            var descCity = city.substring(0, city.length - 1);
          // that.getWeahter(descCity);
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
  }
})
