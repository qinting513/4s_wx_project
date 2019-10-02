const util = require('../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  data: {
    list: []
  },
  ready: function () {
    app.globalData.request.post('/api/information/list',{page: 1, limit: 10}).then(res => {
      this.setData({
        list: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.list)
      })
    })
  },
  methods: {
    goDetailFn: function(e) {
      const path = util.formatPath('INFODETAIL');
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: path + '?id=' + id
      })
    },
  }
})
