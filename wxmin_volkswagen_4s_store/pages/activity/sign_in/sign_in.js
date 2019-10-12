var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');
function calcDateSumByMonthAndYear(year,month) {
  if (year%4 === 0 && month === 2) {
    return 29
  }
  if (year%4 !== 0 && month === 2) {
    return 28
  }
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31
  }
  if (month === 2 || month === 4 || month === 6 || month === 9 || month === 11) {
    return 30
  }
}
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    nbsp: '',
    nowDay: new Date().getDate(),
    todayIsSign: false,
    isShowSignSuccessModel: false,
    signObj: {},
    signMap: {},
    curDateSum: calcDateSumByMonthAndYear((new Date()).getFullYear(), (new Date()).getMonth() + 1),
    remainData: ''
  },
  timeFormat: function(date) {
    if (!date || typeof(date) === "string") {
        this.error("参数异常，请检查...");
    }
    var w = date.getDay(); // 周几
    return w;
  },
  getFirstDayOfMonth: function(date) {
    date.setDate(1);
    return this.timeFormat(date);
  },
  signBtn: function(){
    app.globalData.request.post('/api/sign/dailySign').then(res => {
      this.setData({
        todayIsSign: true,
        isShowSignSuccessModel: true
      }, () => {
        // console.log('signMap===>>>', this.data.signMap)
        this.getSignList()
      })
    })
  },
  onLoad: function (options) {
  },
  onReady: function () {
    this.setData({
      nbsp: this.getFirstDayOfMonth(new Date())
    })
  },
  onShow: function () {
    this.getSignList()
  },
  getSignList: function() {
    // /api/sign/signList
    app.globalData.request.post('/api/sign/signList').then(res => {
      this.setData({
        signObj: res.data,
        signMap: JSON.parse(res.data.signs),
        curDateSum: calcDateSumByMonthAndYear(res.data.year, res.data.month)
      }, () => {
        const {signMap, nowDay, signObj} = this.data
        if (signMap[nowDay] === 1) {
          this.setData({
            todayIsSign: true
          })
        }
        this.setData({
          remainData: Math.abs(Math.ceil(signObj.signDays/7) * 7 - signObj.signDays)
        })
        console.log('signMap===>>>', this.data.curDateSum)
      })
    })
  },
  closeSignSuccessModelFn: function(){
    this.setData({
      isShowSignSuccessModel: false
    })
  },
  bindPickerStoreFn: function(e) {
    const index = e.detail.value;
    const {storeList} = this.data;
    this.setData({
      selStore: storeList[index]
    })
  },
  goOtherPageFn: function(e){
    const pathstring = e.currentTarget.dataset.path;
    const path = util.formatPath(pathstring);
    wx.navigateTo({
      url: path
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  }
})