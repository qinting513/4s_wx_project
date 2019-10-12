var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
let util = require("../../../utils/util.js");
const auth = require('../../../utils/auth.js')
Page({
  data: {
    currentVipTap: 1,
    ossImgAddre,
    vipBg: ossImgAddre + 'banner/mcard.png',
    vipTapList: [
      {id: 1, img: ossImgAddre + 'vip/banner_bg.png'},
      {id: 2, img: ossImgAddre + 'demo_img/2.jpg'},
      {id: 3, img: ossImgAddre + 'demo_img/3.jpg'}
    ],
    baseEquity: [
      {id: 1, text: '精品9折', img_: 'vip_label_9.png'},
      {id: 2, text: '工时6折', img_: 'vip_label_6.png'},
      {id: 3, text: '开卡的券', img_: 'vip_label_coupon.png'},
      {id: 4, text: '会员福利', img_: 'vip_label_welfare.png'},
      {id: 5, text: '特价商品', img_: 'vip_label_goods.png'},
      {id: 6, text: '即买即用', img_: 'vip_label_time.png'}
    ],
    otherEquity: [
      {id: 1, text: '积分兑换', img_: 'integral_exchange.png'},
      {id: 2, text: '精品美容', img_: 'cosmetology.png'},
      {id: 3, text: '工时折扣', img_: 'discount.png'},
      {id: 4, text: '生日礼品', img_: 'birthday.png'},
      {id: 5, text: '全区救援', img_: '24hours.png'},
      {id: 6, text: '3副喷漆', img_: 'car_spray_paint.png'},
      {id: 7, text: '生日双倍', img_: 'double.png'},
      {id: 8, text: '快速换油', img_: 'oil_change.png'},
      {id: 9, text: '热线咨询', img_: 'consultation.png'},
      {id: 10, text: '免费洗车', img_: 'wash_car.png'},
      {id: 11, text: '免费检测', img_: 'Testing.png'},
      {id: 12, text: '保险提醒', img_: 'warn.png'},
      {id: 13, text: '快速定损', img_: 'fixed_loss.png'},
      {id: 14, text: '理赔代办', img_: 'settlement_claims.png'},
      {id: 15, text: '会员活动', img_: 'vip_activity.png'},
      {id: 16, text: '联盟服务', img_: 'union_ser.png'}
    ],
    vipInfoData: {},
    equityTotal: 0,
    shopInfo: {},
    balance: 0
  },
  swiperChange: function(e){
    this.setData({
      currentVipTap: e.detail.current
    })
  },
  goVipRiseFn: function() {
    wx.navigateTo({
      url: '../' + util.formatPath('VIPLEVELRISE')
    });
  },
  goVipchargeFn: function() {
    wx.navigateTo({
      url: '../' + util.formatPath('VIPRECHARGE')
    });
  },
  onLoad: function (options) {
    auth.getStorage('shopInfo').then(res => {
      this.setData({
        shopInfo: res.data
      })
    })
  },
  onReady: function () {
  },
  onShow: function () {
    this.getVipInfoData()
  },
  getLevelRule (){
    wx.navigateTo({
      url: '../level_rule/level_rule'
    });
  },
  getVipInfoData(){
    let { otherEquity } = this.data
    // api/user/userInfo
    app.globalData.request.post('/api/user/userInfo').then(res => {
      this.setData({
        balance: res.data.balance
      })
    })
    
    app.globalData.request.post('/api/member/myMemberInfo').then(res => {
      let defaultOtherEquity = res.data.equityList
      this.setData({
        vipInfoData: res.data,
        equityTotal: res.data.equityList.length,
        otherEquity: otherEquity.map(item => {
          item.active = false
          defaultOtherEquity.map(val => {
            if (item.id === val.equityType) {
              item.active = true
            }
          })
          return item
        })
      }, () => {
        console.log('======>', this.data.vipInfoData)
      })
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