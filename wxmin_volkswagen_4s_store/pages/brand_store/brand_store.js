var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Page({
  data: {
    ossImgAddre,
    img: ossImgAddre + 'demo_img/1.jpg',
    storeList: [
      {id: 1, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店', img:ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店长沙大汉一汽4S中店', img: ossImgAddre + 'demo_img/2.jpg'},
      {id: 3, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店益达无糖口香益达无糖口香', img: ossImgAddre + 'demo_img/3.jpg'},
      {id: 4, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店', img:ossImgAddre + 'demo_img/1.jpg'},
      {id: 5, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店', img:ossImgAddre + 'demo_img/1.jpg'},
      {id: 6, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店', img:ossImgAddre + 'demo_img/1.jpg'},
      {id: 7, dis: '24.5', tel: '0731-8800576', address: '湖南省长沙市星沙中南汽车城188号', name: '长沙大汉一汽4S中店', img:ossImgAddre + 'demo_img/1.jpg'}
    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  callServiceFn: function(e){
    wx.makePhoneCall({
      phoneNumber: '158XXXXXXXX',
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