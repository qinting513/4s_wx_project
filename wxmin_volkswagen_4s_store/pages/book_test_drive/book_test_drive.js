var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'banner/yuyueshijia.png',
    adviserList: [],
    brandList: [],
    setInfoList: [],
    storeList: [{id:1, name: '长沙大众一汽4S店'}, {id: 2, name: '长沙大众一汽4S店长沙永通一汽4S店'}],
    selStore: '',
    selDate: '',
    selTime: '',
    curCarModel: '请选择车辆',
    curCar: '',
    phone: '',
    adviserId: '',
    setId: '',
    brandId: ''
  },
  onLoad: function (options) {
    app.globalData.request.post('/api/basic/getShopInfo').then(res => {
      this.setData({
        storeList: [res.data]
      }, () => {
        console.log('this.goodListthis.goodList', this.data.storeList)
      })
    })
    app.globalData.request.post('/api/reservation/adviserList').then(res => {
      this.setData({
        adviserList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.adviserList)
      })
    })
    app.globalData.request.post('/api/basic/getBrandInfo').then(res => {
      this.setData({
        brandList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.brandList)
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {
    const { curCarModel } = this.data
    this.setData({
      curCar: curCarModel.brandName + curCarModel.setName + curCarModel.remark
    })
  },
  bindDateChange: function(e){
    const curDate = e.detail.value;
    this.setData({
      selDate: curDate
    })
  },
  bindTimeChange: function(e){
    const curTime = e.detail.value;
    this.setData({
      selTime: curTime
    })
  },
  bindPickerBrandFn: function(e) {
    const index = e.detail.value;
    const {brandList} = this.data;
    this.setData({
      selBrand: brandList[index],
      brandId: brandList[index].id
    }, () => {
      app.globalData.request.post('/api/basic/getSetInfo?brandId=' + brandList[index].id).then(res => {
        this.setData({
          setInfoList: res.data
        }, () => {
          console.log('this.goodListthis.goodList', this.data.setInfoList)
        })
      })
    })
  },
  bindPickerSetFn: function(e) {
    const index = e.detail.value;
    const {setInfoList} = this.data;
    this.setData({
      selSetInfo: setInfoList[index],
      setId: setInfoList[index].id
    })
  },
  bindPickerAdviser: function(e) {
    const index = e.detail.value;
    const {adviserList} = this.data;
    this.setData({
      selAdviser: adviserList[index],
      adviserId: adviserList[index].id
    })
  },
  bindPickerStoreFn: function(e) {
    const index = e.detail.value;
    const {storeList} = this.data;
    this.setData({
      selStore: storeList[index]
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  goOtherPageFn: function(e){
    const pathstring = e.currentTarget.dataset.path;
    const path = util.formatPath(pathstring);
    console.log('path', pathstring)
    wx.navigateTo({
      url: path
    })
  },
  submitBook: function(){
    let {brandId, selDate, selTime, setId, phone} = this.data
    // if (!curCarModel.id) {
    //   wx.showToast({
    //     title: '请选择车辆',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false
    // }
    let params = {
      brandId,
      interviewTime: selDate + ' ' + selTime,
      setId,
      phone
    }
    app.globalData.request.post('/api/reservation/testDrive', params).then(res => {
      wx.showModal({
        title: '提示',
        content: '您已提交预约成功，可前往预约订单查看详情！',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
    console.log('paramsparams==>>', params)
  },
  onHide: function () {

  },
  onUnload: function () {

  }
})