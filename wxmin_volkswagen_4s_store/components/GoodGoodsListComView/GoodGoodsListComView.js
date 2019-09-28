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
    list: [1, 2, 3, 4],
    img: ossImgAddre + 'demo_img/1.jpg'
  },
  methods: {
    goGoodsDeatilFn: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../' + util.formatPath('GOODSDETAIL') + '?id=' + id
      })
    }
  }
})
