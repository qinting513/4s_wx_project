
let timer = ''
var app = getApp();
Component({
  properties: {
    newsBannerList: Array
  },
  data: {
    text: '今日油价:92/93# 7.063元；95/97#',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 28,
    orientation: 'left',//滚动方向
    interval: 20 // 时间间隔
  },
  pageLifetimes: {
    // ready() {
      
    // },
    show() { 
      // app.globalData.request.post('/api/banner/getModuleList?type=2').then(res => {
      //   this.setData({
      //     text: res.data.length>0?res.data[0].bannerList[0].moduleName : '暂无资讯'
      //   }, () => {
      //     // console.log('this.goodListthis.goodList', this.data.imgUrls)
      //     // 页面显示
      //     var vm = this;
      //     const {text, size} = this.data
      //     var length = text.length * size * 0.45;//文字长度
      //     var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
      //     vm.setData({
      //       length,
      //       windowWidth,
      //       marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
      //     });
      //     vm.run2();// 第一个字消失后立即从右边出现
      //   })
      // })
    },
    hide() {
      clearInterval(timer);
    },
  },
  methods: {
    run2: function () {
      var vm = this;
      const {length} = this.data;
      timer = setInterval(function () {
        if (-vm.data.marqueeDistance2 < length) {
          // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
          vm.setData({
            marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
            marquee2copy_status: length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
          });
        } else {
          if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
            vm.setData({
              marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
            });
            clearInterval(timer);
            vm.run2();
          } else {
            clearInterval(timer);
            vm.setData({
              marqueeDistance2: -vm.data.windowWidth
            });
            vm.run2();
          }
        }
      }, vm.data.interval);
    }
  }
})
