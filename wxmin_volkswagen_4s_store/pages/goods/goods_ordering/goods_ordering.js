var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
const auth = require('../../../utils/auth.js');
Page({
  data: {
    ossImgAddre,
    num: 1,
    currentTabInfo: '',
    goodsData: {},
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    tabArr: [{id: 1, text: '商品详情'}, {id: 2, text: '商品评价'}],
    goodInfo: '<img src='+ ossImgAddre+'demo_img/1.jpg />',
    isShowSelGoodsLayer: false,
    totalScore: 0,
    curAddressModel: null,
    score: '',
    receiveType: 1,
    userInfo: {
      realName: '',
      phone: ''
    }
  },
  optionNumFn: function(e) {
    const opt = Number(e.currentTarget.dataset.opt);
    if (opt < 0 && this.data.goodsData.num === 1) return;
    this.setData({
      ['goodsData.num']: this.data.goodsData.num + opt,
    }, () => {
      this.setData({
        totalScore: this.data.goodsData.num * this.data.goodsData.curSku.score
      })
    })
  },
  onLoad: function (options) {
    auth.getStorage('defaultAddress').then(res => {
      if (res && res.data) {
        this.setData({
          curAddressModel: res.data
        })
      }
    })
    auth.getStorage('score').then(res => {
      this.setData({
        score: res.data
      })
    })
    auth.getStorage('userInfo').then(res => {
      this.setData({
        userInfo: res.data
      })
    })
    let buyInfo = JSON.parse(options.buyInfo)
    this.setData({
      goodsData: buyInfo,
      totalScore: buyInfo.num * buyInfo.curSku.score
    })
  },
  chooseAddress() {
    ///address/address_list/address_list
    // MYADDRESSLIST
    wx.navigateTo({
      url: '../../address/address_list/address_list?flag=score'
    });
  },
  onReady: function () {

  },
  onShow: function () {
    console.log('curAddressModel==>', this.data.curAddressModel)
  },
  commitOrder(){
    let {curAddressModel,totalScore,goodsData,receiveType} = this.data
    let params = {
      skuId: goodsData.curSku.id,
      num: goodsData.num,
      score: totalScore,
      receiveType,
      addressId: curAddressModel ? curAddressModel.id : ''
    }
    app.globalData.request.post('/api/scoreItem/commitOrder', params).then(res => {
    //   wx.showToast({
    //     title: '兑换成功',
    //     icon: 'success',
    //     duration: 4000,
    //     success: function() {
    //       wx.navigateBack();
    //     }
    //   })
    // })
    wx.showModal({
      title: '提示',
      content: '兑换商品成功，可前往积分订单查看详情！',
      success (res) {
        if (res.confirm) {
          wx.navigateBack();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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