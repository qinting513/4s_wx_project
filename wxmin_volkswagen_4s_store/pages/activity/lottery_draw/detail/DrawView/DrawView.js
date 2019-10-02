var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
let getResultTurnTime = 0
let flashLightFnInteval = ''
let test = 0
let testHttps
Component({
  properties: {
  },
  data: {
    ossImgAddre,
    drawData: [
      {id: 1, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '10个金币'},
      {id: 2, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '25个金币'},
      {id: 3, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '100元京东购物卡'},
      {id: 4, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '车载净化器'},
      {id: 7, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '5个金币'},
      {id: 8, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '10个金币'},
      {id: 9, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '10元话费券'},
      {id: 10, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '50元元加油卡'},
      {id: 11, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '5个金币'},
      {id: 12, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '10元话费券'},
      {id: 5, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: 'HUAWEI Mate20 Pro'},
      {id: 6, img: ossImgAddre + 'activity_lottery_draw/gift_start.png', text: '5个金币'}
    ],
    isShowGotPrizeModel: false,
    currentIndex: -1,
    totalDetail: 12,
    isClick: false,
    isLayer: '',
    speed: 100,
    turnTimes: 0,
    cycle: 3,
    gotPrizeIndex: 11,
    timeNum: 1
  },
  created() {
    this.rollDrawFn = this.rollDrawFn.bind(this)
  },
  pageLifetimes: {
    hide(){
      clearTimeout(this.data.timer);
    }
  },
  methods: {
    flashLightFn: function() { // 灯
      const {speed} = this.data
      let this_ = this
      flashLightFnInteval = setInterval(function(){
        this_.setData({
          timeNum: this_.data.timeNum + 1
        })
      },speed)
    },
    initDrawFn: function () {
      this.setData({
        currentIndex: -1
      })
    },
    startDrawFn: function(){
      if (this.data.isClick) return;
      this.setData({ // 不可点击
        isClick: true,
        isLayer: true
      })
      this.flashLightFn();
      this.rollDrawFn();
    },
    rollChangeCurrentIndexFn: function(){
      let {currentIndex} = this.data
      const {totalDetail} = this.data
      if (currentIndex > -2) {
        currentIndex ++
      }
      if (currentIndex > totalDetail - 1) {
        currentIndex = 0
      }
      this.setData({
        currentIndex
      })
      return currentIndex;
    },
    rollDrawFn: function(){
      const currentIndex = this.rollChangeCurrentIndexFn();
      const {speed, totalDetail, gotPrizeIndex} = this.data;
      let this_ = this
      if (test < 11) {
        test ++;
      }
      this.setData({
        timer: setTimeout(this_.rollDrawFn, speed)
      })
      if (test === 11) {
        getResultTurnTime += speed
        if (currentIndex === gotPrizeIndex && (getResultTurnTime / speed > totalDetail * 2)) {
          clearInterval(testHttps);
          clearTimeout(this.data.timer);
          clearInterval(flashLightFnInteval);
          getResultTurnTime = 0;
          this.setData({
            isShowGotPrizeModel: true, // 得到的奖励
            isClick: false // 可点击了
          })
        }
      }
    },
    stopDrawFn: function (index) {
      this.setData({
        gotPrizeIndex: index
      })
      return false;
    },
    closeSuccessFn: function(){
      this.setData({
        isShowGotPrizeModel: false
      })
    }
  }
})
