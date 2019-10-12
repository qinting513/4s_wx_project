const util = require('../../../../../utils/util.js');
var app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    isShowSelGoodsLayer: Boolean,
    discountList: Object,
  },
  data: {

    selectedIndex: 0,
  },
  ready:function(){
    console.log("==========> ready:", this.properties.discountList);
  },
  methods: {
   
    radioChange(e){
      // 点击切换选择
      var index = e.currentTarget.dataset.index;
      console.log('radio发生change事件', index);
      this.setData({
        selectedIndex: index,
      });
    },

    closeFn: function(e) {
      this.triggerEvent('theCloseFn', null);
    },

    goGoodsOrderingFn: function() {
      this.triggerEvent('theCloseFn', this.data.selectedIndex);
    }
  }
})
