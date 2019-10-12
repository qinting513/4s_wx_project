const util = require('../../../../../utils/util.js');
var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    isShowSelGoodsLayer: Boolean,
    goodsDetail: Object,
  },
  data: {
    img: ossImgAddre + 'demo_img/2.jpg',
    ruleArr: [],
    ruleArrIndex: 0,
    // 数量
    num: 1,
  },
  ready:function(){
    console.log("==========> ready:", this.properties.goodsDetail);
    var goodsDetail = this.properties.goodsDetail;
    var imgs = goodsDetail.pics.split(';');
    this.setData({
      ruleArr: goodsDetail.skus,
      img: imgs[0],
    });
  },
  methods: {
    optionNumFn: function(e) {
      const opt = Number(e.currentTarget.dataset.opt);
      if (opt < 0 && this.data.num === 1) return;
      var num = this.data.num + opt;
      var goodsDetail = this.data.goodsDetail;
      goodsDetail.num = num;
      this.setData({
        num: num,
        goodsDetail: goodsDetail
      });
    },
    setRuleArr(e){
      // 点击切换选择
      var index = e.currentTarget.dataset.index;
      var goodsDetail = this.data.goodsDetail;
      goodsDetail.rule = this.data.ruleArr[index];
      this.setData({
        ruleArrIndex: index,
        goodsDetail: goodsDetail
      });
    },
    closeFn: function(e) {
      this.triggerEvent('theCloseFn', e);
    },
    goGoodsOrderingFn: function() {
      var goodsDetail = this.data.goodsDetail;
      if (goodsDetail.num == null) {
          goodsDetail.num = 1;
      }
      if(goodsDetail.rule == null) {
         goodsDetail.rule = goodsDetail.skus[0];
      }
      this.triggerEvent('theCloseFn');
      wx.setStorageSync("goodsDetail", goodsDetail);
      wx.navigateTo({
        url: '../../detail/VipQualityGoodsOrdering/VipQualityGoodsOrdering'
      })
    }
  }
})
