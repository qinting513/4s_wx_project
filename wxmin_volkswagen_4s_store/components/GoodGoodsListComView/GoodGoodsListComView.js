const util = require('../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    integralList: {
      type: Array,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
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
