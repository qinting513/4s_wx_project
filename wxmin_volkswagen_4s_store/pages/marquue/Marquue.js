const app = getApp();

Page({
  data: {
    marquee:0,   //每次移动X坐标
    windowWidth:0,     //小程序宽度
    maxScroll:0,      //文本移动至最左侧宽度及文本宽度
    text: '滚动文本信息滚动文本信息滚动文本信息滚动文本信息滚动文本信息滚动文本信息结束'
  },
  onLoad: function (options) {
    var t = this;
      var w = wx.getSystemInfoSync().windowWidth;
      var str = this.data.text;
      t.setData({
        marquee: w
      });
      t.data.maxScroll = str.length * 15 + 4;
      t.data.windowWidth = w;
      t.scrolltxt();
  },
  scrolltxt:function(){
    var t = this;
    var d = t.data;
    var interval = setInterval(function () {
      var next = d.marquee-1; //每次移动距离
      if( next<0 && Math.abs(next)>d.maxScroll ){
        next = d.windowWidth;
        clearInterval(interval);
        t.scrolltxt();
      }
      t.setData({
        marquee: next
      });
    }, 80);
  }
})
