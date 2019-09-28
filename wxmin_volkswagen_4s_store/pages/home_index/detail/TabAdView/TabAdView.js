var app = getApp();
var ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../../utils/util.js');

Component({
  properties: {

  },
  data: {
    ossImgAddre,
    tabArr: [
      {id: 1, label: '预约保养', img: ossImgAddre + 'home/tab_hui_icon.png', path: 'BOOKMAINTAIN'},
      {id: 2, label: '热销车型', img: ossImgAddre + 'home/tab_yuan_icon.png', path: 'HOTSELCARTYPE'},
      {id: 3, label: '预约试驾', img: ossImgAddre + 'home/tab_ju_icon.png', path: 'BOOKTESTDRIVE'},
      {id: 4, label: '品牌门店', img: ossImgAddre + 'home/tab_le_icon.png', path: 'BRANDSTORE'},
      {id: 5, label: '一键救援', img: ossImgAddre + 'home/tab_bu_icon.png', path: 'RESCUEINDEX'}
    ]
  },
  methods: {
    goOtherPageFn: function(e){
      const pathstring = e.currentTarget.dataset.path;
      const path = util.formatPath(pathstring);
      wx.navigateTo({
        url: path
      })
    },
    goLotteryDrawFn: function(){
      wx.navigateTo({
        url: '../../../../activity/' + util.formatPath('LOTTERYDRAW')
      })
    }
  }
})
