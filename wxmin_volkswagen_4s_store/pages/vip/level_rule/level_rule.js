var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
let util = require("../../../utils/util.js");
const auth = require('../../../utils/auth.js')
var WxParse = require('../../../utils/wxParse/wxParse.js');

Page({
  data: {
    dataInfo: ''
  },
  onLoad: function (options) {
    app.globalData.request.post('/api/sysConfig/getConfigByCode?code=upgrade_rules').then(res => {
      let dataInfos = res.msg.replace(/↵/g, '<br />')
      // console.log('rs===========>>>', res.msg.replace(/↵/g, '<br />'))
      WxParse.wxParse('dataInfo', 'html', dataInfos, this, 5);
      // this.setData({dataInfo: res.msg.replace('↵', '<br />')})
    })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})