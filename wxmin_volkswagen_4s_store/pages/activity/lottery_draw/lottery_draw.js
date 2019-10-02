var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    winlistSwiper: [{id: 1, content: '恭喜158****2285用户获得车载净化器'}, {id: 2, content: '恭喜189****5669用户获得10元话费券'}],
    tabArr: [
      {id: 1, text: '活动规则'},
      {id: 2, text: '中奖纪录'}
    ],
    currentTab: ''
  },
  signBtn: function(){
    this.setData({
      todayIsSign: true
    })
  },
  changeTabFn: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    this.setData({
      currentTab: this.data.tabArr[1].id
    })
  },
  onReady: function () {

  },
  onShow: function () {
  },
  bindPickerStoreFn: function(e) {
    const index = e.detail.value;
    const {storeList} = this.data;
    this.setData({
      selStore: storeList[index]
    })
  },
  goOtherPageFn: function(e){
    const pathstring = e.currentTarget.dataset.path;
    const path = util.formatPath(pathstring);
    wx.navigateTo({
      url: path
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  }
})