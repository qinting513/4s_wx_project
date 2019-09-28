var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
  },
  data: {
    ossImgAddre
  },
  methods: {
    lowerLogFn: function() {
      console.error('下拉刷新');
    },
    upperLogFn: function() {
      console.error('上拉加载');
    },
  }
})
