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
    goodList: [],
  },
  ready: function () {
    app.globalData.request.get('/api/scoreItem/getCommentItem').then(res => {
      console.log('严选好礼:', res);
      this.setData({
        goodList: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.goodList)
      })
    })
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
        url: '/pages/goods/' + util.formatPath('GOODSDETAIL') + '?id=' + id
      })
    }
  }
})
