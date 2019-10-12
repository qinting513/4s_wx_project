var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    currentVipTap: 0,
    ossImgAddre,
    price: '',
    memberCardId: '',
    vipTapList: [
      {id: 0, img: ossImgAddre + 'demo_img/vip_bg_1.png'},
      {id: 1, img: ossImgAddre + 'demo_img/vip_bg_2.png'},
      {id: 2, img: ossImgAddre + 'demo_img/vip_bg_3.png'}
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
    ]
  },
  swiperChange: function(e){
    let { vipTapList, otherEquity } = this.data
    let defaultOtherEquity = vipTapList[e.detail.current].equityList
    this.setData({
      currentVipTap: e.detail.current,
      memberCardId: vipTapList[e.detail.current].id,
      price: vipTapList[e.detail.current].price,
      baseEquity: vipTapList[e.detail.current].consumEquityList,
      otherEquity: otherEquity.map(item => {
        item.active = false
        defaultOtherEquity.map(val => {
          if (item.id === val.equityType) {
            item.active = true
          }
        })
        return item
      })
    })
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {
    this.getLevelList()
  },
  aboutVipInfo(){
    wx.navigateTo({
      url: '../about_vip/about_vip'
    });
  },
  getMyInfo: function () {
    app.globalData.request.post('/api/user/userInfo').then(res => {
      app.globalData.activeScore = res.data.activeScore
    })
  },
  openVipLevel () {
    let {memberCardId, price } = this.data
    let params = {
      memberCardId,
      money: price
    }
    app.globalData.request.post('/api/member/openMember', params).then(res => {
      let payData =  res.data
      let that = this
      wx.requestPayment({
        timeStamp: payData.timeStamp,
        nonceStr: payData.nonceStr,
        package: payData.package,
        signType: payData.signType,
        paySign: payData.paySign,
        success (res) {
          wx.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 2000
          })
          // wx.navigateBack()
          that.getMyInfo()
          that.getLevelList()
        },
        fail (res) {
          wx.showToast({
            title: '充值失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  },
  getLevelList: function () {
    let { otherEquity } = this.data
    app.globalData.request.post('/api/member/getMemberCardList').then(res => {
        let defaultOtherEquity = res.data[0].equityList
        this.setData({
          vipTapList: res.data,
          baseEquity: res.data[0].consumEquityList,
          memberCardId: res.data[0].id,
          price: res.data[0].price,
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
          console.log('======>', this.data.otherEquity)
        })
      })
  },
  chargeLevelFn(e) {
    console.log('eee==>>>', e)
    this.setData({
      
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