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
    closeFn: function(){
      this.triggerEvent('theCloseFn');
    }
  }
})
