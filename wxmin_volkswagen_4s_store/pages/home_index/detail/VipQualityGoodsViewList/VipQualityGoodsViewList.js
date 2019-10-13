var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    isAuthorModel: false,
    goodList: [],
    currentTab: 0,
    tabList:[],
    phValue: "输入你想要找的商品",
    getInput: null
  },
  onLoad: function (options) { 
    wx.setNavigationBarTitle({
      title: '会员精品',
    });
    this.loadData();
  },
  loadData() {
    var that = this;
    app.globalData.request.post('/api/category/getJinpinCatgory').then(res => {
      if (res && res.code == 200) {
        console.log('会员精品 列表res=========>>>', res.data);
        var list = res.data || [];
        that.setData({
           tabList: list
        });
        var firstItem = res.data[0];
        that.loadDataList(firstItem.id, 0)
      }
    }, error => {
      console.log('errr=========>>>', err)
    });

  },
  loadDataList(id, index) {
    var that = this;
    app.globalData.request.post('/api/jingpin/getJingpinItemList', { "catId": id}).then(res => {
      if (res && res.code == 200) {
        console.log('会员精品 列表List res=========>>>', res);
        var tabList = that.data.tabList;
        var item = tabList[index] || {};
        // 将这个tab对应的数据设置为dataList这个数组
        item.dataList  = res.data;
        tabList[index] = item;
        that.setData({
          tabList: tabList
        });
      }
    }, error => {
      console.log('errr=========>>>', err)
    });
  },

  goDetailFn: function (e) {
    var item = e.currentTarget.dataset.item;
    console.log("goDetailFn item:", item);
    //会员精品详情
    wx.navigateTo({
      url: "../VipQualityGoodsDetail/VipQualityGoodsDetail?id=" + item.id
    })
  },

  changeTabFn(e){
    console.log("changeTabFn:", e);
    var index = e.currentTarget.dataset.index;  
    var item = this.data.tabList[index];
    if(item.dataList == null) {
      this.loadDataList(item.id, index);
    }
    this.setData({
      currentTab: index,
    });
  },
  
  onFocus: function (e) {
    this.setData({
      phValue: ""
    })
  },
  onBlur: function (e) {
    this.setData({
      phValue: "输入你想要找的商品"
    })
  },
  getInput: function (e) { 
    this.data.getInput = e.detail.value;
    console.log("input value:", this.data.getInput);
  },
  gotoSearch(){
    if (this.data.getInput.length == 0) {
      wx.showToast({
        title: '请输入您想要找的商品',
      })
    }
    console.log("gotoSearch value:", this.data.getInput);
    var that = this;
    var id = this.data.tabList[this.data.currentTab].id;
    app.globalData.request.post('/api/jingpin/getJingpinItemList', { "catId": id, "isHomePage": 1, "name": this.data.getInput }).then(res => {
      if (res && res.code == 200) {
        console.log('search List =========>>>', res);
        var tabList = that.data.tabList;
        var item = tabList[that.data.currentTab] || {};
        // 将这个tab对应的数据设置为dataList这个数组
        if(res.data.length == 0) {
          wx.showToast({
            icon:'none',
            title: '没有搜索到您想要找的商品',
          })
        }
        item.dataList = res.data;
        tabList[that.data.currentTab] = item;
        that.setData({
          tabList: tabList
        });
      }
    }, error => {
      console.log('errr=========>>>', err)
    });
  }
})