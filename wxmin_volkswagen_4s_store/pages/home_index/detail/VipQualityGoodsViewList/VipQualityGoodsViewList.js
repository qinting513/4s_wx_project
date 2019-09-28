var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
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
  methods: {
    goListFn: function(e){
      wx.navigateTo({
        url: util.formatPath('NEWGOODSLIST')
      })
    },
    goDetailFn: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../../../car/' + util.formatPath('CARDETAIL') + '?id=' + id
      })
    },
  }
})
