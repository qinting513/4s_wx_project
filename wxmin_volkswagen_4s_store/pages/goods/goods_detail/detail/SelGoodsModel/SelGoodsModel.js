const util = require('../../../../../utils/util.js');
var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    isShowSelGoodsLayer: Boolean,
    goodsDetail: Object
  },
  data: {
    img: ossImgAddre + 'demo_img/2.jpg',
    ruleArr: [{id: 1, text: '坚果套餐'}, {id: 2, text: '水果套餐'}],
    num: 1,
    curSku: null
  },
  methods: {
    optionNumFn: function(e) {
      const opt = Number(e.currentTarget.dataset.opt);
      if (opt < 0 && this.data.num === 1) return;
      this.setData({
        num: this.data.num + opt
      })
    },
    chooseSkus(e){
      let {goodsDetail} = this.data
      this.setData({
        curTab: e.currentTarget.dataset.index,
        curSku: goodsDetail.skus[e.currentTarget.dataset.index]
      })
    },
    closeFn: function() {
      this.triggerEvent('theCloseFn', false);
    },
    goGoodsOrderingFn: function() {
      let {curSku, num, goodsDetail} = this.data
      let info = {
        curSku,
        num,
        itemName: goodsDetail.itemName,
        pic: goodsDetail.pic
      }
      if (!curSku) {
        wx.showToast({
          title: '请选择套餐',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.closeFn()
      wx.navigateTo({
        url: util.formatPath('GOODSORDERING') + '?buyInfo='+JSON.stringify(info)
      })
    }
  }
})
