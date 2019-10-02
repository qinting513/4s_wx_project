var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  data: {
    ossImgAddre,
    lists: [
      {id: 1, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 2, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 3, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
      {id: 4, name: '彭于晏', level: '一级服务顾问', experience: '3年', number: '50台（2018年）', nick: ossImgAddre + 'demo_img/1.jpg'},
    ],
    list: [],
    height:0,
    scrollY:true,
    editIndex:0,
    delBtnWidth: 150//删除按钮宽度单位（rpx）
  },
  swipeCheckX:35, //激活检测滑动的阈值
  swipeCheckState:0, //0未激活 1激活
  maxMoveLeft:185, //列表项最大左滑距离
  correctMoveLeft:175, //显示菜单时的左滑距离
  thresholdMoveLeft: 75,//左滑阈值，超过则显示菜单
  lastShowMsgId:'', //记录上次显示菜单的消息id
  moveX:0,  //记录平移距离
  showState:0, //0 未显示菜单 1显示菜单
  touchStartState:0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
  swipeDirection:0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
  onLoad: function (options) {
    // this.getMyCarList()
    // this.pixelRatio = app.data.deviceInfo.pixelRatio;
    // var windowHeight = app.data.deviceInfo.windowHeight;  
    // var height = windowHeight;
    // this.setData({height:height});
  },
  onReady: function () {

  },
  onShow: function () {
    this.getMyCarList()
    this.pixelRatio = app.data.deviceInfo.pixelRatio;
    var windowHeight = app.data.deviceInfo.windowHeight;  
    var height = windowHeight;
    this.setData({height:height});
  },
  ontouchstart: function(e) {
    if (this.showState === 1) {
      this.touchStartState = 1;
      this.showState = 0;
      this.moveX = 0;
      this.translateXMsgItem(this.lastShowMsgId, 0, 200);
      this.lastShowMsgId = "";
      return;
    }
    this.firstTouchX = e.touches[0].clientX;
    this.firstTouchY = e.touches[0].clientY;
    if (this.firstTouchX > this.swipeCheckX) {
      this.swipeCheckState = 1;
    }
    this.lastMoveTime = e.timeStamp;
  },

  ontouchmove: function(e) {
    if (this.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    if (this.touchStartState === 1) {
      return;
    }
    var moveX = e.touches[0].clientX - this.firstTouchX;
    var moveY = e.touches[0].clientY - this.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (this.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (this.swipeDirection === 0) {
      console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        this.swipeDirection = 2;

        return;
      }
      //触发水平操作
      if (Math.abs(moveX) > 4) {
        this.swipeDirection = 1;
        this.setData({scrollY:false});
      }
      else {
        return;
      }
        
    }
    //禁用垂直滚动
    // if (this.data.scrollY) {
    //   this.setData({scrollY:false});
    // }

    this.lastMoveTime = e.timeStamp;
    //处理边界情况
    if (moveX > 0) {
      moveX = 0;
    }
    //检测最大左滑距离
    if (moveX < -this.maxMoveLeft) {
      moveX = -this.maxMoveLeft;
    }
    this.moveX = moveX;
    this.translateXMsgItem(e.currentTarget.dataset.id, moveX, 0);
  },
  ontouchend: function(e) {
    this.swipeCheckState = 0;
    var swipeDirection = this.swipeDirection;
    this.swipeDirection = 0;
    if (this.touchStartState === 1) {
      this.touchStartState = 0;
      this.setData({scrollY:true});
      return;
    } 
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    if (this.moveX === 0) {
      this.showState = 0;
      //不显示菜单状态下,激活垂直滚动
      this.setData({scrollY:true});
      return;
    }
    if (this.moveX === this.correctMoveLeft) {
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.dataset.id;
      return;
    }  
    if (this.moveX < -this.thresholdMoveLeft) {
      this.moveX = -this.correctMoveLeft;
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.dataset.id;
    }
    else {
      this.moveX = 0;
      this.showState = 0;
      //不显示菜单,激活垂直滚动
      this.setData({scrollY:true});
    }
    this.translateXMsgItem(e.currentTarget.dataset.id, this.moveX, 500);
    //this.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  translateXMsgItem: function(id, x, duration) {
    var animation = wx.createAnimation({duration:duration});
    animation.translateX(x).step();
    this.animationMsgItem(id, animation);
  },
  getItemIndex: function(id) {
    var list = this.data.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i;
      }
    }
    return -1;
  },
  animationMsgItem: function(id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'list[' + index + '].animation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  animationMsgWrapItem: function(id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'list[' + index + '].wrapAnimation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  onMarkMsgTap(e){
    // 设置默认车辆
    app.globalData.request.post('/api/car/setDefault?id=' + e.currentTarget.dataset.id).then(res => {
      wx.showToast({
        title: '设置成功',
        icon: 'success',
        duration: 2000
      })
      that.getMyCarList()
    })
  },
  onDeleteMsgTap(e){
    // 删除车辆
    let that = this
    wx.showModal({
      title: '提示',
      content: '您确定要删除车辆信息吗？',
      success (res) {
        if (res.confirm) {
          app.globalData.request.post('/api/car/deleteMycar?id=' + e.currentTarget.dataset.id).then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            that.getMyCarList()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  chooseCarModel: function (e) {
    const pages = getCurrentPages();             //  获取页面栈
    const currPage = pages[pages.length - 1];    // 当前页面
    const prevPage = pages[pages.length - 2]; 
    if (prevPage.data.curCarModel) {
      prevPage.setData({
        curCarModel: e.currentTarget.dataset.info
      }, () => {
        wx.navigateBack({
          delta: 1
        })
      })
    }
  },
  getMyCarList: function () {
    app.globalData.request.post('/api/car/myCarList').then(res => {
      if (res.data&&res.data.length === 0 ) {
        this.setData({
          height: 0
        })
      }
      this.setData({
        list: res.data
      }, () => {
        console.log('this.goodListthis.goodList', this.data.list)
      })
    })
  },
  goAddFn: function(e) {
    const path = util.formatPath('MYCARUPDATE');
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: path + '?id=' + id
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})