const util = require("../../utils/util.js");
var app = getApp();
Component({
  properties: {
    phoneNum: String
  },
  data: {
    isShowWait: false,
    count: '',
    timer: ''
  },
  methods: {
    countDown() {
      let count = Number(this.data.count) - 1;
      if (count<10) {
        count = '0' + count
      }
      this.setData({
        count
      });
      if (count === 1 || !count) {
        this.overFn();
      }
    },
    overFn: function () {
      clearInterval(this.data.timer)
      this.setData({
        timer: null,
        isShowWait: false
      })
    },
    startTimer() {
      let {count} = this.data;
      count = Number(count);
      if (count > 1 && count <= 60) {
        this.timer = setInterval(this.countDown.bind(this), 1000);
      }
    },
    sendVerificationCodeFn: function() {
      if (!this.properties.phoneNum) {
        util.messageInfoFn('请输入正确的手机号码');
        return;
      }
      let {timer} = this.data;
      if (!timer) {
        this.setData({
          count: 59,
          isShowWait: true
        })
      }
      this.startTimer();
      app.globalData.request.post('/api/user/sendsms', {phone: this.properties.phoneNum}).then(res => {
        wx.showToast({
          title:'验证码已发送',
          icon: 'none',
          duration: 2000
        })
      })
    },
    pageLifetimes: {
      hide() {
        this.overFn();
      }
    }
  }
})
