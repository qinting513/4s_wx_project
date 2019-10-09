var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
const auth = require('../../../../utils/auth.js');

Page({
  data: {
    ossImgAddre,
    num: 1,
    currentTabInfo: '',
    goodsData: {},
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [1, 2, 3, 4],
    tabArr: [{ id: 1, text: '商品详情' }, { id: 2, text: '商品评价' }],
    goodInfo: '<img src=' + ossImgAddre + 'demo_img/1.jpg />',
    isShowSelGoodsLayer: false,
    totalScore: 0,
    curAddressModel: null,
    score: '',
    receiveType: 1,
    userInfo: {
      realName: '',
      phone: ''
    },
    discountsMsg: "",
  },
  optionNumFn: function (e) {
    const opt = Number(e.currentTarget.dataset.opt);
    if (opt < 0 && this.data.goodsData.num === 1) return;
    this.setData({
      ['goodsData.num']: this.data.goodsData.num + opt,
    }, () => {
      this.setData({
        totalScore: this.data.goodsData.num * this.data.goodsData.rule.price
      })
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '下单支付',
    });
    auth.getStorage('defaultAddress').then(res => {
      if (res && res.data) {
        this.setData({
          curAddressModel: res.data
        })
      }
    })
    auth.getStorage('score').then(res => {
      if (res && res.data) { 
        this.setData({
          score: res.data
        })
      }
    })
    auth.getStorage('userInfo').then(res => {
      if (res && res.data) {
        this.setData({
          userInfo: res.data
        })
      }
    })

    var goodsDetail = wx.getStorageSync("goodsDetail");
    goodsDetail.picture = goodsDetail.pics.split(",")[0];
    if (goodsDetail != null) {
        this.setData({
          goodsData: goodsDetail,
          totalScore: goodsDetail.num * goodsDetail.rule.price
        })
    }
    this.getDiscountsData(goodsDetail);
  },
  // 获取优惠券
  getDiscountsData(goodsDetail){
    var params = {
      "skuId": goodsDetail.rule.id,
      "num": goodsDetail.num
    };
    app.globalData.request.post('/api/jingpin/couponList', params).then(res => {
     console.log("获取优惠券:", res);
    })
  },
  chooseAddress() {
    ///address/address_list/address_list
    // MYADDRESSLIST
    wx.navigateTo({
      url: '../../address/address_list/address_list?flag=score'
    });
  },
 
  commitOrder() {
    let params = {
      skuId: this.data.goodsData.rule.itemId,
      num: this.data.goodsData.num,
      price: this.data.totalScore,
      coupon: '1'
    }
    app.globalData.request.post('/api/jingpin/commitOrder', params).then(res => {
      console.log("支付信息:", res);
    });
  },

  selDiscount(){
     this.setData({
       isShowSelGoodsLayer: !this.data.isShowSelGoodsLayer
     })
  },
  closeSelGoodsFn: function (e) {
    var index = e.detail;
    var discountsMsg = "";
    if(index >= this.data.goodsData.skus.length) {
      console.log("不使用优惠券");
      discountsMsg = "不使用优惠券";
    } else {
      var item = this.data.goodsData.skus[index];
      console.log("使用优惠券:", item);
      discountsMsg = item.name  + ": " + item.price + "元"
    }
    this.setData({
      isShowSelGoodsLayer: false,
      discountsMsg: discountsMsg
    })
  },

 
})