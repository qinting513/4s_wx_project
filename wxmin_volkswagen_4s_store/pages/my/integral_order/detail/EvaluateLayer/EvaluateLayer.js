const util = require('../../../../../utils/util.js');
var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    isShowEvaluate: Boolean,
    orderId: String
  },
  data: {
  },
  methods: {
    closeFn: function(e) {
      this.triggerEvent('closeFn', false);
    },
    textareaInputFn(e) {
      this.setData({
        content: e.detail.value
      })
    },
    submitCommet(){
      let that = this
      const {orderId, content} = this.data
      if (!content) {
        wx.showToast({
          title: '请输入评价',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      let params = {
        orderId,content,
        star: 5,
        pics: ''
      }
      app.globalData.request.post('/api/scoreItem/commentOrder', params).then(res => {
        wx.showToast({
          title: '感谢您的评价',
          icon: 'success',
          duration: 2000
        })
        this.closeFn()
      })
    }
  }
})
