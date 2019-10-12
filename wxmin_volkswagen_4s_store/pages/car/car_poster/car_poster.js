var app = getApp();
const ossImgAddre = app.globalData.ossImgAddre;
const util = require('../../../utils/util.js');

Page({
  	data: {
		ossImgAddre,
		id: '',
		carDetailImg: '',
		base64ImgUrl: '',
		img: ossImgAddre + 'banner/sharebg.jpg',
		// shareBgImgs: [
		// 	'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share2.png',
		// 	'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share3.png',
		// 	'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share1.png'
		// ],
		shareBgImgs: [
			{id: 1, img: 'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share1.png'},
			{id: 2, img: 'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share2.png'},
			{id: 3, img: 'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share3.png'}
		],
		selBgInfo: {id: 1, img: 'https://meibao.oss-cn-shenzhen.aliyuncs.com/mp4s/2019/00/banner/share1.png'},
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
		let {carDetailImg, qrCodePath, selBgInfo, shareBgImgs, curQrCode} = this.data
		console.log('imgimgimgimg=====>>', curQrCode, qrCodePath)
		util.getImageInfoFn({
			key: '背景图',
			src: selBgInfo.img,
			successFn: function(res){
				// console.log('beijingtu=====>', res, 'img===>', img)
				const setImageBg = res.path
				util.getImageInfoFn({
					key: '汽车详情',
					src: carDetailImg.replace(/http:/, 'https:'),
					successFn: function(carRes){
						util.drawSharePic({
							qrCodePath: 'data:image/png;base64,' + curQrCode,
							// qrCodePath: curQrCode,
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
	getBase64ImageUrl: function(base64Data) {
		/// 获取到base64Data
		// var base64Data = 'xxxxxx';
		/// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
		base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
		/// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
		const base64ImgUrl = "data:image/png;base64," + base64Data;   
		/// 刷新数据
		this.setData({
				base64ImgUrl: base64ImgUrl
		})
	},
  	onLoad: function (options) {
			// console.log('options', options)
			// this.getBase64ImageUrl(options.curQrCode)
			this.setData({
				list: JSON.parse(options.list),
				id: options.sn,
				curQrCode: options.curQrCode,
				carDetailImg: JSON.parse(options.list)[0]
				// selBgInfo: {img: this.data.img, id:  options.sn}
			})
		// this.setData({
		// 	id: options.sn,
		// 	carDetailImg: JSON.parse(options.list)[0],
		// 	selBgInfo: list[0]
		// })
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