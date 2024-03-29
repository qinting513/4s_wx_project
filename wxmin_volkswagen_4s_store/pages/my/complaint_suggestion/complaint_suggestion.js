// pages/my/complaint_suggestion/complaint_suggestion.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  contentInputFn: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  commitSuggestion: function(){
    const { content } = this.data
    let params = {
      content
    }
    app.globalData.request.post('/api/feedback/commit', params).then(res => {
      wx.showToast({
        title: '已提交',
        icon: 'success',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})