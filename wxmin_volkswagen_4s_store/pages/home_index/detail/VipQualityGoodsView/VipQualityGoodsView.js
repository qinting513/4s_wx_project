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
    this.loadDataList();
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
    loadDataList(id) {
      var that = this;
      app.globalData.request.post('/api/jingpin/getJingpinItemList', {"isHomePage": 1 }).then(res => {
        if (res && res.code == 200) {
          console.log('会员精品 getJingpinItemList res=========>>>', res);
          
          that.setData({
            vipGoodsBannerList: res.data
          });
        }
      }, error => {
        console.log('errr=========>>>', err)
      });
    },
  }
})
