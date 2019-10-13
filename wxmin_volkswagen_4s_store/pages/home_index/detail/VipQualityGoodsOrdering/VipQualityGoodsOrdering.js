var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
const auth = require('../../../../utils/auth.js');

Page({
  data: {
    ossImgAddre,
    goodsData: {},
    isShowSelGoodsLayer: false,
    totalScore: 0,
    curAddressModel: null,
    score: '',
    receiveType: 2,
    userInfo: {
      realName: '',
      phone: ''
    },
    discountList: null,
    discountsMsg: "不使用优惠券",
    selectedDiscountIndex: -1,
    couponPrice: "",
  },
  optionNumFn: function (e) {
    const opt = Number(e.currentTarget.dataset.opt);
    if (opt < 0 && this.data.goodsData.num === 1) return;
    var count = this.data.goodsData.num + opt;
    this.setData({
      ['goodsData.num']: count,
      totalScore: count * this.data.goodsData.rule.price
    });
    this.closeSelGoodsFn(null);
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '下单支付',
    });
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
      if (res.code == "200") {
        var list = res.data;
        // 给最后一个增加一个不使用优惠券
        list[list.length] = {"name": "不使用优惠券", "price": "","couponPrice":"", "id": "-1" };
        this.setData({
          discountList: list
        });
      }
    })
  },
  chooseAddress() {
    ///address/address_list/address_list
    // MYADDRESSLIST
    wx.navigateTo({
      url: '../../../address/address_list/address_list?flag=score'
    });
  },
 
  commitOrder() {
    let params = {
      skuId: this.data.goodsData.rule.id,
      num: this.data.goodsData.num,
      price: Number.parseFloat(this.data.totalScore),
    }
    if(this.data.discountList != null &&
      this.data.selectedDiscountIndex != -1 &&
      this.data.selectedDiscountIndex != this.data.length -1) {
      params.coupon = this.data.discountList[this.data.selectedDiscountIndex].id;
    }
    
    console.log("支付下发参数:", params);
    app.globalData.request.post('/api/jingpin/commitOrder', params).then(res => {
      console.log("支付信息:", res);
      this.wxPay(res.data)
    });
  },

  wxPay(param) {
    console.log('wxpay param=', param)
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: res => {
        console.log('pay success res=', res)
        this.showModal('支付成功')
       },
      fail: res => {
        console.log('pay fail res=', res)
        this.showModal('支付失败')
       }
    })
    
  },

  showModal(msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success: res => {
        if (res.confirm && msg == '支付成功') {
          wx.navigateBack();
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },

  selDiscount(){
     this.setData({
       isShowSelGoodsLayer: !this.data.isShowSelGoodsLayer
     })
  },
  closeSelGoodsFn: function (e) {
    console.log('closeSelGoodsFn e=', e)
    var index = (e && e.detail !== null) ? e.detail : this.data.selectedDiscountIndex;
    console.log('index=', index)
    var discountsMsg = "";
    var couponPrice = "";
    // 原本总的价格
    var totalScore = this.data.goodsData.num * this.data.goodsData.rule.price;
    if (index == -1 || index == this.data.discountList.length -1) {
      discountsMsg = "不使用优惠券";    
    } else {
      var item = this.data.discountList[index];
      discountsMsg = item.name  + ": " + item.price + "元"
      couponPrice = "优惠:" + item.couponPrice;
      totalScore = totalScore - item.couponPrice;
      // 保留2位小数
      totalScore = totalScore.toFixed(2);
    }
    this.setData({
      isShowSelGoodsLayer: false,
      discountsMsg: discountsMsg,
      selectedDiscountIndex: index,
      couponPrice: couponPrice,
      totalScore: totalScore,
    })
  },

  onShow() {
    // 选择地址回来后 刷新UI
    auth.getStorage('defaultAddress').then(res => {
      console.log("address ", res);
      if (res && res.data && res.data != '') {
        this.setData({
          curAddressModel: res.data
        })
      } else {
        this.setData({
          receiveType: 2,
          curAddressModel: null
        })
      }
    });
  }

 
})