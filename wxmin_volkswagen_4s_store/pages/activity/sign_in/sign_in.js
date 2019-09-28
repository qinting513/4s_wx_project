var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    nbsp: 3,
    todayIsSign: false,
    isShowSignSuccessModel: false
  },
  signBtn: function(){
    this.setData({
      todayIsSign: true,
      isShowSignSuccessModel: true
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  closeSignSuccessModelFn: function(){
    this.setData({
      isShowSignSuccessModel: false
    })
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