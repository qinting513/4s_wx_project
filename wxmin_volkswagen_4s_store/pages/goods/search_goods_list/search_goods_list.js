var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    list: [
      {id: 1, text: 'asf萨达是否按时发大水阿萨德'},
      {id: 2, text: '米其林轮胎'},
      {id: 3, text: '汽车机油'},
      {id: 4, text: '保养'},
      {id: 5, text: '酒鬼花生米'},
      {id: 6, text: '男士钱包'}
   ],
   queryString: {
    name: '',
    categoryId: '',
    page: 1,
    limit: 10
  },
   integralList: []
  },
  onLoad: function (options) {
    console.log('options===>>>>', options)
    this.setData({
      ['queryString.name']: options.searchkey
    }, () => {
      this.getGoodList()
    })
  },
  getGoodList(){
    let {queryString} = this.data
    app.globalData.request.post('/api/scoreItem/itemList', queryString).then(res => {
      this.setData({
        integralList: res.data
      }, () => {
        console.log('======>', this.data.integralList)
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  goBack: function () {
    wx.navigateBack();
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