const util = require('../../utils/util.js');
var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  data: {
    list: [
      {id: 1, title: '电动车请注意，交警已经盯上了你！', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, title: '今天刷爆朋友圈的“黑洞”，一起来认识它。', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 3, title: '本周油价又要涨了？原油价格震荡造成', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 4, title: '爱车油表显示“0”时，到底还能跑多远？', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
      {id: 5, title: '想买心爱的车咋这么难？！这里的小妙招了解下吧~', time: '2019-04-14 22：02', author: '早三分钟', img: ossImgAddre + 'demo_img/1.jpg'},
    ]
  },
  methods: {
    goDetailFn: function(e) {
      const path = util.formatPath('INFODETAIL');
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: path + '?id=' + id
      })
    },
  }
})
