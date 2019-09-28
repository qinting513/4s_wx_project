var app = getApp();
Component({
  properties: {

  },
  data: {
    ossImgAddre: app.globalData.ossImgAddre
  },
  ready() {
  },
  methods: {
    getWeahter: function (city) { // 获取天气信息
      var that = this
      var url = "https://free-api.heweather.com/v5/weather"
      var params = {
        city: city,
        key: "894fc2a749104d679fa022c3e71afe83"
      }
      wx.request({
        url: url,
        data: params,
        success: function (res) {
          var tmp = res.data.HeWeather5[0].now.tmp;
          var txt = res.data.HeWeather5[0].now.cond.txt;
          var code = res.data.HeWeather5[0].now.cond.code;
          var qlty = res.data.HeWeather5[0].aqi.city.qlty;
          var dir = res.data.HeWeather5[0].now.wind.dir;
          var sc = res.data.HeWeather5[0].now.wind.sc;
          var hum = res.data.HeWeather5[0].now.hum;
          var fl = res.data.HeWeather5[0].now.fl;
          var daily_forecast = res.data.HeWeather5[0].daily_forecast;
          that.setData({
            tmp: tmp,
            txt: txt,
            code: code,
            qlty: qlty,
            dir: dir,
            sc: sc,
            hum: hum,
            fl: fl,
            daily_forecast: daily_forecast
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
  }
})
