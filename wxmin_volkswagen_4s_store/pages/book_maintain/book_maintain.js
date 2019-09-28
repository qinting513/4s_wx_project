var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    storeList: [{id:1, name: '长沙大众一汽4S店'}, {id: 2, name: '长沙大众一汽4S店长沙永通一汽4S店'}],
    selStore: ''
  },
  onLoad: function (options) {

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