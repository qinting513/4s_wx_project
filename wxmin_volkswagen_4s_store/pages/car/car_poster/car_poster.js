var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  	data: {
		ossImgAddre,
		id: '',
		carDetailImg: '',
		img: ossImgAddre + 'demo_img/1.jpg',
		list: [
			{id: 1, img: ossImgAddre + 'demo_img/goods_2.png'},
			{id: 2, img: ossImgAddre + 'demo_img/goods_2.png'},
			{id: 3, img: ossImgAddre + 'demo_img/goods_3.png'},
			{id: 4, img: ossImgAddre + 'demo_img/goods_1.png'},
			{id: 5, img: ossImgAddre + 'demo_img/goods_2.png'},
			{id: 6, img: ossImgAddre + 'demo_img/goods_3.png'},
			{id: 7, img: ossImgAddre + 'demo_img/goods_1.png'}
		],
		selBgInfo: '',
		qrCodePath: 'https://beta.dlm.ed58.net/client/ClientShare/shareQR?height=300&width=300&url=' + encodeURIComponent('weixin://wxpay/bizpayurl?pr=U4tmn5N'),
		shareImage: '',
		goodPicPath: '',
		isShowOpensetting: false,
	},
	selBgFn: function(e){
		const selBgInfo = e.currentTarget.dataset.selBgInfo;
		if (this.data.selBgInfo.id === selBgInfo.id) return;
		const this_ = this
		this.setData({
			selBgInfo
		}, function(){
			util.messageLoadingFn('正在生成图片...');
			this_.setImageFn();
		})
	},
	setImageFn: function(){
		let this_ = this
		let {carDetailImg, qrCodePath, selBgInfo} = this.data
		util.getImageInfoFn({
			key: '背景图',
			src: selBgInfo.img,
			successFn: function(res){
				const setImageBg = res.path
				util.getImageInfoFn({
					key: '汽车详情',
					src: carDetailImg,
					successFn: function(carRes){
						util.drawSharePic({
							// qrCodePath: 'data:image/png;base64,' + qrCodePath,
							qrCodePath: carRes.path,
							goodPicPath: carRes.path,
							setImageBg,
							this_: this_
						})
					}
				})
			}
		});
		
	},
	saveImageToPhoneFn: function(){
		let this_ = this
		util.saveImageToPhoneFn({
			picUrl: this_.data.shareImage,
			returnFunction: function(){
				wx.navigateBack()
			},
			failFunction: function(){
				this_.setData({
					isShowOpensetting: true
				})
			}
		})
	},
	openSettingFn: function(){
		wx.openSetting({
			success(settingdata) {
				console.error('settingdata',settingdata)
				if (settingdata.authSetting["scope.writePhotosAlbum"]) {
						console.log("获取权限成功，再次点击图片保存到相册")
				} else {
					console.log("获取权限失败")
				}
			},
			fail(settingdata){
				console.error('Failsettingdata',settingdata)
				wx.showToast({
					title: settingdata.errMsg,
					icon: 'none'
				})
			}
		})
		this.setData({
			isShowOpensetting: false
		})
	},
	cancelOpenSettingFn: function(){
		this.setData({
			isShowOpensetting: false
		})
	},
	savePhotoFn: function(){
		let this_ = this
		util.saveImageToPhoneFn({
			picUrl: this_.data.shareImage,
			returnFunction: function(){
				wx.navigateBack()
			},
			failFunction: function(){
				this_.setData({
					isShowOpensetting: true
				})
			}
		})
	},
  	onLoad: function (options) {
		const {list} = this.data
		this.setData({
			id: options.sn,
			carDetailImg: options.carDetailImg,
			selBgInfo: list[0]
		})
		util.messageLoadingFn('正在生成图片...');
  },
  onReady: function () {
	  const {id} = this.data
	  const this_ = this
	  let postData = {
		page: 'pages/car/car_detail/car_detail',
		scene: id
	}
	// this.setData({
	// 	canvasCtx: wx.createCanvasContext('shareCanvas')
	// }, function(){
	// });
	// app.servise.qrcodeWxacodeSer(postData).then(res=>{
		// this_.setData({qrCodePath: res.data},function(){
			this_.setImageFn()
			
		// })
	// })
  },
  onShow: function () {

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