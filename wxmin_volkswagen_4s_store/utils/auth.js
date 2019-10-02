const regeneratorRuntime = require('./runtime')
const request = require('./request.js')
const auth = {
  checkUserAuth: async function () {
    console.log('检查是否有授权')
    let this_ = this
    var pages = getCurrentPages();//获取页面栈
    console.log('pages==>>>', pages)
    // 判断是否获取授权
    let getSettingInfo = await auth.getSetting()
    // 有授权就登录
    if (getSettingInfo.authSetting['scope.userInfo']) {
      console.log('有授权，去登录')
      // this_.isAuth = false
      // auth.login()
      try {
        let token = await auth.getStorage('token') || ''
        const tokenSaveTime = await auth.getStorage('tokenSaveTime') || 0
        // const userSaveInfo = await auth.getStorage('userInfo') || 0
        const curTime = new Date().getTime()
        if (!token) {
          return auth.login()
        }
        console.log('有token！！！')
        if (curTime - tokenSaveTime.data > 2000*60*60) {
          console.log('超时啦！')
          wx.showToast({
            title: '登录过期，重登陆中',
            icon: 'loading'
          })
          return auth.login()
        }
        console.log('有token！！！未超时', curTime - tokenSaveTime.data)
        let userSaveInfo = await request.post('/api/user/userInfo')
        if (userSaveInfo&&!userSaveInfo.data.phone) {
          return  wx.reLaunch({
            url: '/pages/binding_phone/binding_phone'
          })
        }
        if (userSaveInfo&&!userSaveInfo.data.token) {
          pages[0].onShow()
        }
        console.log('userSaveInfo.data.phone==>>', userSaveInfo.data)
      } catch (error) {
        auth.login()
      }
      try {
        // const shopInfo = await auth.getStorage('shopInfo') || ''
        // console.log('shopInfo==>>', shopInfo)
        // if (!shopInfo) {
        pages[0].onReady()
        // }
      } catch (error) {
        pages[0].onShow()
      }
    } else {
      console.log('没有授权，去授权')
      // this_.isAuth = true
      return wx.navigateTo({url: '/pages/authorization/authorization'})
    }
    // var pages = getCurrentPages();//获取页面栈
    // if (pages.length > 1) {
    // //上一个页面实例对象
    //   var prePage = pages[pages.length - 2];
    // //调用上一个页面的onShow方法
    //   prePage.onReady()
    //   wx.navigateBack()
    // }
  },
  getUserInfo: function () {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({success: resolve, fail: reject})
    })
  },
  loginWeChat: function () {
    return new Promise((resolve, reject) => {
      wx.login({success: resolve, fail: reject})
    })
  },
  setStorage: function (key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({ key: key, data: value, success: resolve, fail: reject })
    })
  },
  getStorage: function (key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({ key: key || '', success: resolve, fail: reject })
    })
  },
  getSetting: function () { // 微信授权
    return new Promise((resolve, reject) => {
      wx.getSetting({success: resolve, fail: reject})
    })
  },
  login: async function () {
    try {
      let loginInfo = await auth.loginWeChat()
      console.log('获取登录code', loginInfo)
      if (loginInfo.errMsg === 'login:ok') {
        // 获取用户信息
        const userInfo = await auth.getUserInfo()
        console.log('获取userInfo11111', userInfo)
        let loginData = {
          jscode: loginInfo.code,
          shareCode: '',
          nickName: userInfo.userInfo.nickName,
          avatarUrl: userInfo.userInfo.avatarUrl,
          gender: userInfo.userInfo.gender
        }
        let loginMemberId = await request.post('/api/oauth/login', loginData)
        console.log('获取loginMemberId', loginMemberId)
        // 否则存储用户id
        await auth.setStorage('shareNo', loginMemberId.data.shareNo)
        await auth.setStorage('token', loginMemberId.data.token)
        await auth.setStorage('tokenSaveTime', new Date().getTime())
        
        // 存储用户信息
        await auth.setStorage('userInfo', loginMemberId.data)
        if(loginMemberId.data&&!loginMemberId.data.phone){
          return  wx.reLaunch({
            url: '/pages/binding_phone/binding_phone'
          })
        }
        // 保存到后端
        var pages = getCurrentPages();//获取页面栈
        const authRoute = '/authorization/authorization'
        const curRoute =  pages[pages.length-1].route
        console.log('curRoutecurRoutecurRoute', curRoute)
        if (curRoute.indexOf(authRoute) !== -1) {
          wx.navigateBack()
        } else {
            var prePage = pages[pages.length - 1];
            prePage.onReady()
        }
      }
    } catch (err) {
      console.log('error in auth==>', err)
    }
    getApp().globalData.isAuth=0;
  }
}

module.exports = auth