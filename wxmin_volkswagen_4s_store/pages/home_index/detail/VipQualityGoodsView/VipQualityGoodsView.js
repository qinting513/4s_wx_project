var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    vipGoodsBannerList: Array
  },
  data: {
    ossImgAddre,
  },
  ready: function (options) {
   console.log("vip ready function");
  },
  methods: {
    goListFn: function(e){
      wx.navigateTo({
        url: "./detail/VipQualityGoodsViewList/VipQualityGoodsViewList" //会员精品

      })
    },
    goDetailFn: function(e) {
     var item = e.currentTarget.dataset.item;
      console.log("goDetailFn item:", item);
     //会员精品详情
      wx.navigateTo({
        url: "./detail/VipQualityGoodsDetail/VipQualityGoodsDetail?id=" + item.id
      })
    },
   
  }
})
