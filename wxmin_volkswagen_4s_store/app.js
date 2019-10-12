//app.js
const regeneratorRuntime = require('./utils/runtime')
const {checkUserAuth, getStorage, setStorage}  = require('./utils/auth')
App({
  data: {
    deviceInfo:{}
  },
  onLaunch: function () {
    // 展示本地存储能力
    this.data.deviceInfo = wx.getSystemInfoSync();
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  onShow: function(){
  },
  globalData: {
    ossImgAddre: 'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/',
    userInfo: 'asfa',
    activeScore: 0,
    isAuth:0,
    request: require('./utils/request'),
    baseUrl: require('./utils/config').baseUrl
  }
})