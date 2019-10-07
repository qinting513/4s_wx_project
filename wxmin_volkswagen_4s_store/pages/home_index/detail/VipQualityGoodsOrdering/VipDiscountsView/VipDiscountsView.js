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
    num: 1
  },
  ready:function(){
    console.log("==========> ready:", this.properties.goodsDetail);
    var skus = this.properties.goodsDetail.skus;
    skus[skus.length] = {"name": "不使用优惠券","price":"", "id": "-1"}
    this.setData({
      ruleArr: skus,
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
    radioChange(e){
      // 点击切换选择
      var index = e.currentTarget.dataset.index;
      console.log('radio发生change事件', index);
      this.setData({
        ruleArrIndex: index,
      });
    },

    closeFn: function(e) {
      this.triggerEvent('theCloseFn', e);
    },

    goGoodsOrderingFn: function() {
      this.triggerEvent('theCloseFn', this.data.ruleArrIndex);
    }
  }
})
