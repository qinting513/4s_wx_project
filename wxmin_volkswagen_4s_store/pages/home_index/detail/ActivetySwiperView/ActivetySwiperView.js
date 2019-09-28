var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Component({
  properties: {

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
  methods: {

  }
})
