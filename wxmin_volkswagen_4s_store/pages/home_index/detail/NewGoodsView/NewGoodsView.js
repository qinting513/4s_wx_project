var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    newCarBannerList: Array
  },
  data: {
    ossImgAddre,
    listPageUrl: util.formatPath('NEWGOODSLIST'),
    goodList: [
      {id: 1, img: ossImgAddre + 'demo_img/new_car1.png'},
      {id: 2, img: ossImgAddre + 'demo_img/new_car2.png'},
      {id: 3, img: ossImgAddre + 'demo_img/new_car3.png'}
    ],
  },
  attached: function () {
    // app.globalData.request.post('/api/banner/getModuleList?type=5').then(res => {
    //   this.setData({
    //     goodList: res.data[0].bannerList
    //   }, () => {
    //     console.log('this.goodListthis.goodList', this.data.goodList)
    //   })
    // })
  },
  methods: {
    goListFn: function(e){
      wx.navigateTo({
        url: util.formatPath('NEWGOODSLIST')
      })
    },
    goDetailFn: function(e) {
      const jumpUrl = e.currentTarget.dataset.jumpUrl;
      if (jumpUrl && jumpUrl.length > 0){
        wx.navigateTo({
          url: jumpUrl
        })
      }
    },
  }
})
