const util = require('../../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    invitaList: []
  },
  onLoad: function (options) {
    // this.getSignUrl()
    let shareNo = ''
    let that = this
    wx.getStorage({
      key: 'shareNo',
      success (res) {
        console.log('res===>>', res)
        that.setData({
          shareNo: res.data
        })
      },
      fail (err) {
      }
    })
  },
  getInvitaList(){
    // /api/user/invitaList
    app.globalData.request.post('/api/user/invitaList').then(res => {
      this.setData({
        invitaList: res.data
      })
    })
    
  },
  onReady: function () {
    this.getInvitaList()
    
  },
  onShow: function () {

  },
  inviteFriends(){

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  getSignUrl: function(){
    // /api/weixin/gainSign?url=分享地址
    app.globalData.request.post('/api/weixin/gainSign?url=/pages/home_index/home_index').then(res => {
      this.setData({
        curUrl: res.url
      })
    })
  },
  onShareAppMessage: function (options) {
    return {
      title: '测试',
      path: '/pages/home_index/home_index?shareNo='+this.data.shareNo,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title:'分享失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})