<template>
 	<view class="content">
 		<view class="oder-head">
				<view class="oder-ins">
					<view class="status">
						返款银行信息
					</view>
					<view class="">
						户名：{{user.name}}
					</view>
					<view class="status">
						银行：{{user.bink}}
					</view>
					<view class="">
						账号：{{user.num}}
					</view>
				</view>
 		</view>
		<view class="order-money"  v-for="(item,index) in order" :key="index">
			<view>
			<!-- <navigator :url="'/pages/orderPage/orderPage?item='+ encodeURIComponent(JSON.stringify(item))"> -->
			<view class="money-head">
				<view class="money-number">
					<p class="number">订单编号：{{item.id}}</p>
					<p class="time">订单时间：{{item.create_time}}</p>
				</view>
				<view class="money-prompt">
					{{item.order_status}}
					<button class="mini-btn off" type="default"  size="mini" @click="newStatus(index)">确定收款</button>
					<button class="mini-btn off" type="default"  size="mini" @click="newPic(index)">上传凭证</button>
				</view>
			</view>
			
			<view class="oder-main">
				<view class="status">
					商户订单号：{{item.order_num}}
				</view>
				<view class="oder-main-money">
					交 易 金 额：
					<span>{{item.price}}</span>
				</view>
				<view class="status">
					支 付 方 式：{{item.pay_type}}
				</view>
				<view class="">
					待 返 金 额：{{item.collection_user_price}}
				</view>
				<view class="status">
					返 款 状 态：{{item.back_status}}
				</view>
				<view class="status">
					<span class="word">收  款  码：</span>
					<image class="image" :src="item.img" mode=""></image>
					<image class="image-two" v-show="item.certificate_img" :src="item.certificate_img" mode=""></image>
				</view>
			</view>
			<!-- </navigator> -->
			</view>
		</view>
		<view class="example-body">
			<uni-pagination :current="current" :total="total" title="标题文字" :show-icon="true" @change="change" />
			<button class="mini-btn off" type="default"  size="mini" @click="newOrder()">刷新</button>
		</view>
		
 	</view>
 </template>
 
 <script>
	 import service from '../../service.js';
	 import uniRequest from 'uni-request';
	 const BASE_URL = 'http://www.luominus.com/';
	 import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	 import uniList from '@/components/uni-list/uni-list.vue'
	 import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	 // import uniSection from '@/components/uni-section/uni-section.vue'
 	export default {
 	components: {
 		uniPagination,
 		uniList,
 		uniListItem,
 		// uniSection
 	},
 	data() {
 		return {
 			current: 1,
 			total: 0,
 			pageSize: 10,
				
			user: {
				name:'',
				bink:'',
				num:''
			},
			order:[{
				id: '',
				back_status: "",
				order_status: "",
				order_num: "",
				collection_code_id: 0,
				create_time: "",
				merchants_order_num: "",
				price: 0,
				collection_user_price: 0,
				pay_type: "",
				img: "",
				certificate_img: "",
			}]
 		}
 	},
	onLoad() {
		let validUser = service.getUsers();
			if (validUser.length !== 0) {
				uni.showLoading({
				    title: '加载中'
				});
			const newData = {
				token:validUser[0].token,
				// token:'hy3fB7yKi8dWZtgCyrJYRA==',
				page: this.current,
				limit:this.pageSize
			}
			
			uni.request({
				url:BASE_URL + "api/v1/Index/orderList",  
				data: newData,  
				method:'GET',  
				dataType:'json',  
				header:{  
					'content-type':'application/json'  
				},
				success: (e) =>{  
					console.log(e) 
					 if (e.statusCode === 200) {
						if (e.data.code === 200) {
							var myData = e.data.data
							this.add( e.data.data)
							this.user = {
								name:myData.bank_info.user_name,
								bink:myData.bank_info.name,
								num:myData.bank_info.card_id
							}
							this.order = myData.order_list.map((item) => {
								return {
									id: item.id,
									price: item.price,
									back_status: item.back_status,
									order_status: item.order_status,
									order_num: item.order_num,
									collection_code_id: item.collection_code_id, //人工
									create_time: item.create_time, //安全敏
									merchants_order_num: item.merchants_order_num, //政治敏
									collection_user_price: item.collection_user_price, //机器人对话轮数
									pay_type: item.pay_type, 
									img: item.img, 
									certificate_img:item.certificate_img,
									order_status_num:  item.order_status_num
								};
							});
							console.log(	this.order)
						}
					 }
				},  
			})
		}
	},
 	methods: {
		newPic(index) {
			var that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: BASE_URL+ "api/v1/Index/uploadImg",
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							success: (res) => {
								console.log('上传图片第一个接口',res)
								var res_data = JSON.parse(res.data);
								if (res_data.code !== 200) {
									uni.showToast({
										title: '上传失败',
										icon: 'none',
										duration: 1000
									})
								}
								that.imageSrc = res_data.url;
								that.menus.zfb.img = imageSrc
								let validUser = service.getUsers();
								var upPicData = {
									certificate: that.imageSrc ,
									order_id: this.order[index].id,
									token:validUser[0].token,
								}
								uniRequest.post(BASE_URL + "api/v1/index/addCertificate", upPicData)
									.then(function(response) {
										if (response.data.code === 200) {
											uni.showToast({
												title: '上传成功',
												icon: 'success',
												duration: 1000
											})
											that.newOrder()
										} else {
											uni.showToast({
												icon: 'none',
												title: '添加失败请重试',
												duration: 1000
											});
										}
									}).catch(function(error) {
										console.log(error);
									});
								
							},
							fail: (err) => {
								uni.showModal({
									content: err.errMsg,
									showCancel: false,
									duration: 1000
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
		},
		newStatus(index) {
			uni.showToast({
				icon: 'none',
				title: '修改中',
			});
			var that = this;
			let validUser = service.getUsers();
			// console.log(this.order[index])
			var newData = {
				token:validUser[0].token,
				order_id:this.order[index].id,
				code_id:this.order[index].collection_code_id,
				order_status: 2//确定收款
				
			}
			console.log(newData)
			uniRequest.post(BASE_URL + "api/v1/Index/changeOrderStatus", newData)
				.then(function(response) {
					if (response.status === 200) {
						if (response.data.code === 200) {
							console.log(response);
							that.newOrder()
							
						}else{
							uni.showToast({
								icon: 'none',
								title: '修改失败，稍后再试',
							});;
						}
					}
					else {
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '用户账号或密码不正确',
						// });
					}
				}).catch(function(error) {
					console.log(error);
				});
		},
		newOrder() {
			uni.showLoading({
			    title: '刷新中'
			});
			let validUser = service.getUsers();
			const newData = {
				token:validUser[0].token,
				// token:'hy3fB7yKi8dWZtgCyrJYRA==',
				page: this.current,
				limit:this.pageSize
			}
			
			uni.request({
				url:BASE_URL + "api/v1/Index/orderList",  
				data: newData,  
				method:'GET',  
				dataType:'json',  
				header:{  
					'content-type':'application/json'  
				},
				success: (e) =>{  
					console.log(e) 
					 if (e.statusCode === 200) {
						if (e.data.code === 200) {
							var myData = e.data.data
							this.add( e.data.data)
							this.user = {
								name:myData.bank_info.user_name,
								bink:myData.bank_info.name,
								num:myData.bank_info.card_id
							}
							this.order = myData.order_list.map((item) => {
								return {
									id: item.id,
									price: item.price,
									back_status: item.back_status,
									order_status: item.order_status,
									order_num: item.order_num,
									collection_code_id: item.collection_code_id, //人工
									create_time: item.create_time, //安全敏
									merchants_order_num: item.merchants_order_num, //政治敏
									collection_user_price: item.collection_user_price, //机器人对话轮数
									pay_type: item.pay_type, 
									img: item.img, 
									order_status_num:  item.order_status_num
								};
							});
							// console.log(	this.order)
						}
					 }
				},  
			})
		},
		add(n) {
			console.log('add')
 			this.total += n
 		},
 		reset() {
 			this.total = 0
 			this.current = 1
 		},
 		change(e) {
 			console.log(e)
			console.log(e.current)
 			this.current = e.current
			let validUser = service.getUsers();
				if (validUser.length !== 0) {
					// uni.showLoading({
					//     title: '加载中'
					// });
				const newData = {
					token:validUser[0].token,
					// token:'hy3fB7yKi8dWZtgCyrJYRA==',
					page: this.current,
					limit:this.pageSize
				}
				
				uni.request({
					url:BASE_URL + "api/v1/Index/orderList",  
					data: newData,  
					method:'GET',  
					dataType:'json',  
					header:{  
						'content-type':'application/json'  
					},
					success: (e) =>{  
						console.log(e) 
						 if (e.statusCode === 200) {
							if (e.data.code === 200) {
								var myData = e.data.data
								this.order = myData.order_list.map((item) => {
									return {
										id: item.id,
										back_status: item.back_status,
										order_status: item.order_status,
										order_num: item.order_num,
										collection_code_id: item.collection_code_id, //人工
										create_time: item.create_time, //安全敏
										merchants_order_num: item.merchants_order_num, //政治敏
										collection_user_price: item.collection_user_price, //机器人对话轮数
										pay_type: item.pay_type, 
										img: item.img, 
										order_status_num:  item.order_status_num
									};
								});
							}
						 }
					},  
				})
			}
 		}
 	}
 	}
 </script>
 <style lang="scss" scoped>
	 
 	.content {
 		background: #FFFFFF;
 	}
	
	.all-money {
		display: flex;
		height: 100upx;
		background-color: #eaeaea;
		line-height: 100upx;
		width: 90%;
		margin: 20upx auto;
		justify-content: space-between;
		.title {
			width: 30%;
			padding-left: 25upx;
			font-size: 52upx;
		}	
		.kong {
			width: 48%;
		}
		.yuan {
			width: 22%;
			font-size: 22upx;
			color: #c5c5c5;
		}
	}
 	.oder-head {
 		// display: flex;
 		border-radius: 12upx;
 		// border: 1upx solid #8F8F94;
		box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		width: 100%;
 	}
		
 	uni-form {
		width: 100%;
	}
 	.uni-column {
 		display: flex;
 		height: 80upx;
 		line-height: 80upx;
		width: 90%;
		margin: 0 auto;
 		justify-content: space-between;
 		.title {
 			width: 30%;
			font-size: 34upx;
 		}	
 		.kong {
 			width: 55%;
 		}
 		.user-switch {
 			width: 15%;
 		}
 	}
	.backgroud {
		background-color: #CCCCCC;
	}
		
	.oder-ins {
		// border-top: 1px solid #dedede;
		width: 90%;
		margin: 20upx auto;
		font-size: 35upx;
	}
	.order-money {
		font-size: 30upx;
		box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		border-radius: 12upx;
		margin-top: 60upx;
		// height: 620upx;
		.money-head {
			display: flex;	
			.money-number {
				flex: 60%;
				box-sizing: border-box;
				padding: 20upx;
				.number{
					font-size: 33upx;
				}
				.time {
					font-size: 23upx;
					color: #8F8F94;
				}
			}
			.money-prompt {
				flex: 40%;
				text-align: center;
				font-size: 30upx;
				color: #eeb68a;
				margin-top: 4%;
			}
		}
		
			
		.oder-main {
			padding: 20upx;
				
			.status {
				margin: 10upx 0;
				    position: relative;

			}
			.oder-main-money span{
				color: #be7981;
			}
			.word {
				letter-spacing:4px;
				    position: absolute;
				    top: 1px;
			}
			.image {
				width: 140upx;
				height: 200upx;
				margin-left: 180upx;
				margin-bottom: 40upx;
			}
			.image-two {
				width: 140upx;
				height: 200upx;
				margin-left: 100upx;
				margin-bottom: 40upx;
			}
		}
	}
	
	
 </style>
<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		margin-top:30upx;
		font-size: 14px;
		background-color: #ffffff;
		text-align: center;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
		text-align: center;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		text-align: center;
		/* #endif */
	}

	.btn-view {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		text-align: center;
		background-color: #fff;
		justify-content: center;
		align-items: center;
	}

	.button {
		margin-bottom: 20px;
		width: 350px;
	}
</style>
 