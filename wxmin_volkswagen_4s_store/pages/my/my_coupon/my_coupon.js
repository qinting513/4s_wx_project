var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    currentTab: 1,
    statusMap: {
      1: '使用',
      2: '已使用',
      3: '已过期'
    },
    tabArr: [
      {id: 1, text: '全部'},
      {id: 2, text: '未使用'},
      {id: 3, text: '已使用/过期'}
    ],
    myCouponList: []
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.myCouponList()
  },
  myCouponList: function () {
    app.globalData.request.post('/api/user/couponList?status='+this.data.currentTab).then(res => {
      // var list = [];
      // for(let i = 0 ; i < 4; i++) {
      //   let resObj = JSON.parse(JSON.stringify(res.data[0]));
      //   resObj.type  = i;
      //   if (i == 0) {
      //     resObj.status = 2
      //   } else if (i == 1) {
      //     resObj.status = 3
      //   }
      //   list.push(resObj);
      // }
      this.setData({
        myCouponList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.myCouponList)
      })
    })
  },
  changeTabFn: function(e) {
    const item = e.currentTarget.dataset.item;
    this.setData({
      currentTab: item.id
    }, () => {
      this.myCouponList()
    })
  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
    })
  },
  goDetailFn: function(e) {
    const dataset = e.currentTarget.dataset
    const path = dataset.path;
    let id = '';
    let url  = util.formatPath(path);
    if (dataset.id) {
      id = dataset.id;
      url  = util.formatPath(path) + '?info=' + JSON.stringify(id);
    }
    wx.navigateTo({
      url
    })
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