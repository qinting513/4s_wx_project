var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Component({
  properties: {
    headBannerList: Array
  },
  data: {
    ossImgAddre,
    imgUrls: [
      {id: 1, img: ossImgAddre + 'demo_img/home_header.png'},
      {id: 2, img: ossImgAddre + 'demo_img/2.jpg'},
      {id: 3, img: ossImgAddre + 'demo_img/3.jpg'}
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  ready: function () {
    // app.globalData.request.post('/api/banner/getModuleList?type=1').then(res => {
    //   this.setData({
    //     imgUrls: res.data.length>0?res.data[0].bannerList : []
    //   }, () => {
    //     console.log('this.goodListthis.goodList', this.data.imgUrls)
    //   })
    // })
  },
  methods: {
    gotoSomeDetail(e){
      let url = e.currentTarget.dataset.url
      wx.navigateTo({
        url
      })
    }
  }
})
