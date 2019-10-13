var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'banner/wode-banner.png',
    tabArr: [
      {id: 1, img: ossImgAddre + 'my/base_car.png', text: '我的车辆', path: 'MYMYCAR'},
      {id: 2, img: ossImgAddre + 'my/base_order.png', text: '服务订单', path: 'SERORDER'},
      {id: 3, img: ossImgAddre + 'my/base_integral.png', text: '积分订单', path: 'INTEGRALORDER'},
      {id: 4, img: ossImgAddre + 'my/base_adviser.png', text: '专属顾问', path: 'MyADVISERINDEX'}
    ],
    vipToolArr: [
      {id: 1, img: ossImgAddre + 'my/vip_tool_invite.png', text: '邀请好友', path: 'INVITEFRIENDS'},
      {id: 2, img: ossImgAddre + 'my/vip_tool_address_black.png', text: '地址管理', path: 'MYADDRESSLIST'},
      {id: 3, img: ossImgAddre + 'my/vip_tool_store.png', text: '专属门店', path: 'ADVISERINDEX'},
      {id: 4, img: ossImgAddre + 'my/vip_tool_complaint.png', text: '投诉建议', path: 'COMPLAINTSUGGESTION'},
      {id: 5, img: ossImgAddre + 'my/vip_tool_accpunt_set.png', text: '账号设置', path: 'ACCOUNTSET'}
    ],
    myInfoData: {},
    activeScore: ''
  },
  onLoad: function (options) {
  },
  onReady: function () {
    // this.getMyInfo()
  },
  onShow: function () {
  //  auth.checkUserAuth()
   this.getMyInfo()
    console.log('app.globalData==>>', app.globalData)
    this.setData({
      activeScore: app.globalData.activeScore
    })
  },
  getMyInfo: function () {
    // 
    app.globalData.request.post('/api/user/userInfo').then(res => {
      // auth.setStorage('score', res.data.activeScore)
      app.globalData.activeScore = res.data.activeScore
      this.setData({
        myInfoData: res.data,
        activeScore: res.data.activeScore
      }, () => {
        console.log('this.goodListthis.goodList', this.data.myInfoData)
      })
    })
  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
    })
  },
  goOtherFn: function(e) {
    const path = e.currentTarget.dataset.path;
    const score = e.currentTarget.dataset.score;
    console.log('eeeee==>>', JSON.stringify(score))
    if(path === 'ADVISERINDEX'){
      return  wx.showToast({
        title: '☞正在努力开发中，尽请期待',
        icon: 'none',
        duration: 2000
      })
    }
    wx.navigateTo({
      url: util.formatPath(path)+'?score='+score
    })
  },
  goOtherModelFn: function(e) {
    const dataset = e.currentTarget.dataset
    const path = dataset.path;
    if(path === 'SIGNIN'){
      return  wx.showToast({
        title: '☞正在努力开发中，尽请期待',
        icon: 'none',
        duration: 2000
      })
    }
    const pathForce = dataset.pathforce;
    wx.navigateTo({
      url: pathForce + util.formatPath(path)
    });
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