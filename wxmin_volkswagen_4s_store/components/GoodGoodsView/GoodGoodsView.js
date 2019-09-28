var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../utils/util.js');
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
  },
  data: {
    ossImgAddre,
    goodList: [
      {id: 1, oldPrice: '20.9', int: 500, name: '【泰国进口】...', img: ossImgAddre + 'demo_img/goods_1.png'},
      {id: 2, oldPrice: '20.9', int: 500, name: '【敏感肌福音...', img: ossImgAddre + 'demo_img/goods_2.png'},
      {id: 3, oldPrice: '20.9', int: 500, name: '益达无糖口香益达无糖口香', img: ossImgAddre + 'demo_img/goods_3.png'},
      {id: 4, oldPrice: '20.9', int: 500, name: '益达无糖口香', img: ossImgAddre + 'demo_img/goods_1.png'},
      {id: 5, oldPrice: '20.9', int: 500, name: '第三方三', img: ossImgAddre + 'demo_img/goods_2.png'},
      {id: 6, oldPrice: '20.9', int: 500, name: '查实的撒发大水发斯蒂芬', img: ossImgAddre + 'demo_img/goods_3.png'},
      {id: 7, oldPrice: '20.9', int: 500, name: '查实的撒发大水发斯蒂芬', img: ossImgAddre + 'demo_img/goods_1.png'}
    ],
  },
  methods: {
    goOtherPageFn: function(e){
      const pathstring = e.currentTarget.dataset.path;
      const path = util.formatPath(pathstring);
      wx.navigateTo({
        url: path
      })
    },
    goGoodsDeatilFn: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../goods/' + util.formatPath('GOODSDETAIL') + '?id=' + id
      })
    }
  }
})
