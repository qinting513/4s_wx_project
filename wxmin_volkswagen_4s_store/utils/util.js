const { getStorage }  = require('./auth.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 
 * @param {*} n 
 */
const formatPath = input => {
  const pathArr = {
    HOMEINDEX: "../home_index/home_index",
    INDEX: "../home_index/home_index",
    LOGS: "../logs/logs",
    BOOKMAINTAIN: "../book_maintain/book_maintain",
    HOTSELCARTYPE: "../hot_sel_car_type/hot_sel_car_type",
    BOOKTESTDRIVE: "../book_test_drive/book_test_drive",
    CARDETAILBOOKTESTDRIVE: "book_test_drive/book_test_drive",
    BRANDSTORE: "../brand_store/brand_store",
    RESCUEINDEX: "../rescue_index/rescue_index",
    NEWGOODSLIST: "../car/car_list/car_list", // 车列表
    CARDETAIL: "car_detail/car_detail", // 车详情
    CARPOSTER: "../../../car_poster/car_poster", // 创建海报
    GOODGOODSLIST: "../goods/good_goods_list/good_goods_list",
    ADVISERINDEX: "../../adviser/adviser_list/adviser_list", // 顾问列表
    MyADVISERINDEX: "../../adviser/adviser_list/adviser_list", // 我的顾问列表
    ADVISERDETAIL: "../adviser_detail/adviser_detail", // 顾问详情
    MYCAR: "../my_car/my_car_list/my_car_list", // 我的车
    MYMYCAR: "../../my_car/my_car_list/my_car_list", // 我的车
    MYCARUPDATE: "../my_car_update/my_car_update", // 修改我的车
    INFODETAIL: "../info_detail/info_detail", // 资讯详情
    MYINFOEDIT: "../my_info_edit/my_info_edit", // 个人信息编辑
    MYCOUPON: "../my_coupon/my_coupon", // 我的卡券
    MYCOUPONDETAIL: "../my_coupon_detail/my_coupon_detail", // 我的卡券
    MYINTEGRAL: "../my_integral/my_integral", // 我的积分
    INVITEFRIENDS: "../invite_friends/invite_friends", // 邀请好友
    COMPLAINTSUGGESTION: "../complaint_suggestion/complaint_suggestion", // 投诉建议
    SERORDER: "../ser_order/ser_order", // 服务订单
    SERORDERDETAIL: "../ser_order_detail/ser_order_detail", // 服务订单详情
    INTEGRALORDER: "../integral_order/integral_order", // 积分订单
    INTEGRALORDERDETAIL: "../integral_order_detail/integral_order_detail", // 积分订单详情
    ACCOUNTSET: "../account_set/account_set", // 账号设置
    MYADDRESSLIST: "../../address/address_list/address_list", // 我的--地址管理
    ADDRESSUPDATE: "../address_update/address_update", // 我的--修改
    ADDRESSADD: "../address_add/address_add", // 我的--添加
    SEARCHGOODS: "search_goods/search_goods", // 搜索界面
    SEARCHGOODSLIST: "../search_goods_list/search_goods_list", // 搜索列表页面
    GOODSDETAIL: "goods_detail/goods_detail", // 商品详情
    GOODSORDERING: "../goods_ordering/goods_ordering", // 商品下单
    VIPRECHARGE: "vip_recharge/vip_recharge", // vip充值 
    VIPLEVELRISE: "vip_level_rise/vip_level_rise", // vip升级
    SIGNIN: "sign_in/sign_in", // 签到
    LOTTERYDRAW: "lottery_draw/lottery_draw", // 抽奖
  }
  return pathArr[input];
}
const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src';

const base64src = function(base64data) {
  return new Promise((resolve, reject) => {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    console.log('buffer=========>>>', buffer, filePath)
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath);
      },
      fail(res) {
        reject(res);
      },
    });
  });
};
var rpx;
//获取屏幕宽度，获取自适应单位
wx.getSystemInfo({
	success: function(res) {
    rpx = res.windowWidth/375;
	},
})
let remSize =  function(num) {
  return num * rpx
}
const drawSharePic = obj => {
  const canvasCtx = wx.createCanvasContext('shareCanvas');
	let canvase_w = remSize(284);
  let canvase_h = remSize(414);
  // canvasCtx.clearRect(0, 0, remSize(284), remSize(414));
  // canvasCtx.draw(false);
  //绘制背景
  canvasCtx.drawImage(obj.setImageBg, 0, 0, canvase_w, canvase_h);
  // canvasCtx.draw(true);
  //绘制商品图片
	let banner_x = remSize(0);
	let banner_y = remSize(35);
	let banner_w = remSize(284);
	let banner_h = remSize(173.5);
  canvasCtx.drawImage(obj.goodPicPath, banner_x, banner_y, banner_w, banner_h);
  canvasCtx.draw(true)
  // //绘制二维码
	base64src(obj.qrCodePath).then(Response=>{
    console.log('Response===>>', Response)
    // let res = obj.goodPicPath
    canvasCtx.drawImage(Response, remSize(104.5), remSize(312), remSize(75.5), remSize(75.5));
		canvasCtx.draw(true, setTimeout(function(){
			wx.canvasToTempFilePath({
				width: canvase_w,
				height: canvase_h,
				canvasId: 'shareCanvas',
				fileType: 'jpg',
				quality: 1,
				success: function (res) {
					obj.this_.setData({
						shareImage: res.tempFilePath
					})
          wx.hideLoading();
				},
				fail: function (res) {
					wx.hideLoading();
				}
			})
		}, 1000));
  })
}
const saveImageToPhoneFn = obj =>{
	wx.saveImageToPhotosAlbum({
      filePath: obj.picUrl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
           if (res.confirm) {
              obj.returnFunction()
            }
          }
        })
			},
			fail(res) {
				if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === 'saveImageToPhotosAlbum:fail:auth denied') {
					obj.failFunction()
			 }
		}
  })
}
const messageSucessFn = msg =>{
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  })
}
const messageInfoFn = msg =>{
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}
const messageLoadingFn = msg =>{
  wx.showLoading({
    title: msg,
    mask: true
  })
}
const getImageInfoFn = obj =>{
  console.log('obj======>>', obj)
  wx.getImageInfo({
    src: obj.src,
    success(res) {
      obj.successFn(res)
    },
    fail(res) {
      console.log('error --res==>>', res)
      wx.showToast({
        title: '该'+obj.key+'图片地址有问题,非本平台支持的~',
        icon: 'none',
        duration:2000
      })
    }
  })
}
const getWidth =(str)=>{
  return [].reduce.call(str, (pre, cur, index, arr) => {
    if (str.charCodeAt(index) > 255) {// charCode大于255是汉字
      pre++;
    } else {
      pre += 0.5;
    }
    return pre;
  }, 0);
}
const getDuration = (str)=>{// 保留，根据文字长度设置时间
  return this.getWidth(str)/10;
}
const makePhoneCallFn = ()=>{
  getStorage('shopInfo').then(res => {
    // console.log('shopInfo=========res=======>>', res)
    wx.makePhoneCall({
      phoneNumber: res.data.phone,
    })
  })
}
module.exports = {
  formatTime,
  formatPath,
  saveImageToPhoneFn,
  drawSharePic,
  messageSucessFn,
  messageInfoFn,
  getImageInfoFn,
  messageLoadingFn,
  getWidth,
  getDuration,
  remSize,
  makePhoneCallFn
}
