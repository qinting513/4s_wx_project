const util = require('../../../../../utils/util.js');
var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    isShowSelGoodsLayer: Boolean
  },
  data: {
    img: ossImgAddre + 'demo_img/2.jpg',
    ruleArr: [{id: 1, text: '坚果套餐'}, {id: 2, text: '水果套餐'}],
    num: 1,
  },
  methods: {
    optionNumFn: function(e) {
      const opt = Number(e.currentTarget.dataset.opt);
      if (opt < 0 && this.data.num === 1) return;
      this.setData({
        num: this.data.num + opt
      })
    },
    closeFn: function(e) {
      this.triggerEvent('theCloseFn', e);
    },
    goGoodsOrderingFn: function() {
      wx.navigateTo({
        url: util.formatPath('GOODSORDERING')
      })
    }
  }
})
