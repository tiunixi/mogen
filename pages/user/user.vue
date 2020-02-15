<template>
	<view class="content">
		<view class="user-head">
			    <view class="input-row border">
			    	<text class="title">姓 名：{{menus.user_name}}</text>
			    	<!-- <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号">tinuxi</m-input> -->
			    </view>
				 <view class="input-row border">
					<text class="title">手机号：{{menus.user_mobile}}</text>
					<!-- <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号">19987183997</m-input> -->
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">开工状态</view>
					<view class="kong">
						
					</view>
				    <view class="user-switch">
						<switch name="switch" :checked="treatmentStatu.checked" @change="switchChange"/>
				    </view>
				</view>
		</view>
		<view class="tab-card">
			<sun-tab :value.sync="swiperIndex" :tabList="tabSwiperList"></sun-tab>
				<swiper :current="swiperIndex" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange" class="tab-word">
					<swiper-item v-for="(swiper,index) in tabSwiperList" :key="index">
						<view v-if="!showOrNo(index)" style="margin:0 20px;background-color: #FFFFFF;text-align: center;">
							<view class="uni-padding-wrap uni-common-mt">
								<!-- wx -->
								<view class="demo">
									<block v-if="imageSrc && img(menus.wx.img)">
										<image :src="menus.wx.img" class="images" ></image>
										<view class="money">
											<p>已收款{{menus.wx.count}}笔，{{menus.wx.price}}元</p>
											<button class="mini-btn off" type="default"  size="mini" @click="chooseImageWX(index)">重新上传</button>
											<!-- <span>  </span> -->
											<!-- <button class="mini-btn del" type="default" size="mini">关闭</button> -->
										</view>
									</block>
									<block v-else>
										<view class="uni-hello-addfile" @click="chooseImageWX(index)">+ 选择图片</view>
									</block>
								</view>
							</view>
						</view>
						<view v-if="showOrNo(index)" style="margin:0 20px;background-color: #FFFFFF;text-align: center;">
							<view class="uni-padding-wrap uni-common-mt">
								<view class="demo">
									<block v-if="imageSrc && img(menus.zfb.img)">
										<image :src="menus.zfb.img" class="images" ></image>
										<view class="money">
											<p>已收款{{menus.zfb.count}}笔，{{menus.zfb.price}}元</p>
											<button class="mini-btn off" type="default"  size="mini" @click="chooseImageZFB(index)">重新上传</button>
											<!-- <span>  </span>
											<button class="mini-btn del" type="default" size="mini">关闭</button> -->
										</view>
									</block>
									<block v-else>
										<view class="uni-hello-addfile" @click="chooseImageZFB(index)">+ 选择图片</view>
									</block>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import sunUiUpimg from '@/components/sunui-upimg/sunui-upimg.vue';
	import mInput from '../../components/m-input.vue'
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import service from '../../service.js';
	const BASE_URL = 'http://www.luominus.com/';
	const IMG_URL = 'http://www.luominus.com/static/frontend/images/upload.png';
	import uniRequest from 'uni-request';
	// import toUpImg from '../../upImg.js';
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','avatarUrl']),
		components: {
			sunTab,mInput,uniNavBar,'sunui-upimg': sunUiUpimg
		},
		data() {
			return {
				swiperIndex:0,
				index: 0,
				account: '',
				tabSwiperList: ['支付宝','微信',],
				treatmentStatu: { checked: false },
				upimg_move: false,
				imageSrc: false,
				menus : {
							"wx": {
					            "img": IMG_URL,
					            "price": 0,
					            "count": 0,
					            "status": 0
					        },
					        "zfb": {
					            "img":IMG_URL,
					            "price": 0,
					            "count": 0,
					            "status": 0
					        },
					        "user_name": "",
					        "user_mobile": ""
				},
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		onUnload() {
			this.imageSrc = false;
		},
		onLoad() {
			var that = this
				if (!this.hasLogin) {
					uni.showLoading({
					    title: '加载中'
					});
						let validUser = service.getUsers();
						if (validUser.length !== 0) {
							const newData = {
								token:validUser[0].token
								
							}
							// 存在缓存数据getUsers（）对象
							// console.log(validUser[0].token)
							
							setTimeout(function () {
							    uni.hideLoading();
							}, 2000);
							uni.request({  
								url:BASE_URL + "api/v1/Index/getMyCode",  
								data: newData,  
								method:'GET',  
								dataType:'json',  
								header:{  
									'content-type':'application/json'  
								},  
								success: (e) =>{  
									console.log(e) 
									 if (e.statusCode === 200) {
									 		var myData = e.data.data
									 		that.menus = {
									 			wx : e.data.data.wx,
												"zfb":e.data.data.zfb,
												"user_name": e.data.data.user_name,
												"user_mobile": e.data.data.user_mobile
									 		}
											that.imageSrc = true
											if (myData.status === 1) {
												//1 未开工
												that.treatmentStatu = { checked: false }
											}
											else{
												that.treatmentStatu = { checked: true }
											}
									 		console.log(that.menus)
									 	
									 }
								},  
							})
						} else {
						uni.showModal({
							title: '未登录',
							content: '您未登录，需要登录后才能继续',
							/**
							 * 如果需要强制登录，不显示取消按钮
							 */
							showCancel: !this.forcedLogin,
							success: (res) => {
								if (res.confirm) {
									/**
									 * 如果需要强制登录，使用reLaunch方式
									 */
									if (this.forcedLogin) {
										uni.reLaunch({
											url: '../login/login'
										});
									} else {
										uni.navigateTo({
											url: '../login/login'
										});
									}
								}
							}
						});
					}		
				}
			}
		,
		//退出登录
		onNavigationBarButtonTap(e) {
		    console.log("success")  
			uni.removeStorage({
			    key: 'USERS_KEY',
			    success: function (res) {
			        console.log('success');
			    }
			});
			  uni.navigateTo({
				url: '../login/login',
			  });
		},
		methods: {
			...mapMutations(['logout']),
			chooseImageZFB: function(index) {
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
										code: that.imageSrc ,
										type: 1,
										token:validUser[0].token,
									}
									uniRequest.post(BASE_URL + "api/v1/User/addCode", upPicData)
										.then(function(response) {
											if (response.data.code === 200) {
												uni.showToast({
													title: '上传成功',
													icon: 'success',
													duration: 1000
												})
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
										showCancel: false
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
			
			chooseImageWX: function(index) {
				var that = this
					uni.chooseImage({
						count: 1,
						sizeType: ['compressed'],
						sourceType: ['album'],
						success: (res) => {
							console.log('chooseImage success, temp path is', res.tempFilePaths[0])
							var imageSrcMy = res.tempFilePaths[0]
							uni.uploadFile({
								url: BASE_URL+ "api/v1/Index/uploadImg",
								filePath: imageSrcMy,
								fileType: 'image',
								name: 'file',
								success: (res) => {
									console.log('uploadImage success, res is:', res)
									var res_data = JSON.parse(res.data);
									if (res_data.code !== 200) {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 1000
										})
									}
									that.imageSrc = res_data.url;
									that.menus.wx.img = imageSrcMy
									let validUser = service.getUsers();
									var upPicData = {
										code: that.imageSrc ,
										type: 2,
										token:validUser[0].token,
									}
									uniRequest.post(BASE_URL + "api/v1/User/addCode", upPicData)
										.then(function(response) {
											if (response.data.code === 200) {
												uni.showToast({
													title: '上传成功',
													icon: 'success',
													duration: 1000
												})
											} else {
												uni.showToast({
													icon: 'none',
													title: '添加失败请重试',
													duration: 1000
												});
											}
										}).catch(function(error) {
											console.log(error);
										})
								},
								fail: (err) => {
									console.log('uploadImage fail', err);
									uni.showModal({
										content: err.errMsg,
										showCancel: false
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
			
			
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			swiperChange(e){
				this.swiperIndex = e.target.current;
			},
			showOrNo(img) {
				// console.log(img)
				if (img === 0) {
						return true;
				}
				else if(img === 1)
				{
					return false;
				}
			},
			img(img) {
				// console.log(img)
				// console.log(img === IMG_URL)
				return (img !== IMG_URL);
			},
			switchChange (e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value)   // 将点击改变的状态赋给treatmentStatu.checked
				console.log(value)
				console.log(!this.havePromise)
				var  newStatus = 1
				if (value && !this.havePromise) {
					newStatus =2
					that.$set(that.treatmentStatu, 'checked', false)  // 手动修改switch的状态，视图会同步更新
					
				}
				let validUser = service.getUsers();
				const data = {status:newStatus,token:validUser[0].token}
				uniRequest.post(BASE_URL + "api/v1/Index/changeWorkStatus", data)
					.then(function(response) {
						if (response.status === 200) {
							console.log(response);
							if (response.data.code === 200) {
								console.log('cg');
								
							}else{
								uni.showToast({
									icon: 'none',
									title: response.data.msg,
									 duration: 2000
								});
							}
						}
						else {
							uni.showToast({
								icon: 'none',
								title: '请稍候重试',
								duration: 1000
							});
						}
					}).catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>
<style lang="less" scoped>
	.images {
		width: 450upx;
		height: 600upx;
	}
	
	.demo {
		background: #FFF;
		padding: 0 50upx;
	}
.uni-page-head-ft {
	position: relative;
	right: 19px;
}
.uni-page-head-btn {
	position: relative;
	    right: 25px;
}
</style>
<style lang="less" scoped>
	
.uni-page-head-ft {
	position: relative;
	right: 19px;
}
.sunui-img-removeicon {
	position: absolute;
	color: #fff;
	width: 40upx;
	height: 40upx;
	line-height: 40upx;
	z-index: 2;
	text-align: center;
	background-color: #E54D42;

	&.right {
		top: 0;
		right: 0;
	}
}
	.sunui-uploader-input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.sunui-uploader-inputbox {
		position: relative;
		margin-bottom: 16rpx;
		box-sizing: border-box;
		background-color: #ededed;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 200px;
		margin: 0 auto;
	}

	.sunui-img-removeicon {
		position: absolute;
		color: #fff;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		z-index: 2;
		text-align: center;
		background-color: #E54D42;

		&.right {
			top: 0;
			right: 0;
		}
	}

	.sunui-uploader-file {
		position: relative;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
		    margin: 0 auto;
	}

	.sunui-uploader-file-status:before {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.sunui-loader-filecontent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		z-index: 9;
	}
.content {
	background: #FFFFFF;
}
.header {
	}
.user-head {
	// margin-top: 46px;
	border-radius: 12upx;
	// border: 1upx solid #8F8F94;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
	height: 300upx;
}
	
uni-form {
	width: 98%;
}
.input-row {
	height: 100upx;
	line-height: 100upx;
	// display: block;
	.title {
		// color: #8F8F94;
		width: auto;
	}
}
.uni-column {
	display: flex;
	height: 100upx;
	line-height: 100upx;
	justify-content: space-between;
	.title {
		width: 30%;
		padding-left: 25upx;
	}	
	.kong {
		width: 50%;
	}
	.user-switch {
		width: 20%;
	}
}

	
.tab-card {
	// border: 1px  #8F8F94 solid;	
	box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
	border-radius: 12upx;
	margin-top: 60upx;
	// height: 630upx;
	.tab-word {
		height: 830upx;
		// border-left: 1px  #8F8F94 solid;
		// border-right: 1px  #8F8F94 solid;
		// border-bottom: 1px  #8F8F94 solid;
	}
}
.special-img {
	width: 500upx;
	height: 600upx;
}
.up-img {
	width: 400upx;
	height: 400upx;
	margin-top: 150upx;
}
	
.mySunui {
	margin-top: 50upx;
}
.money p {
	margin: 30upx 0;
}	
.primary {
	width: 90%;
	height: 90upx;
	line-height: 90upx;
	margin: 60upx auto;
}
.del {
	border: 1px solid #ff6666 ;
	color: #ff6666;
}
.off {
	border: 1px solid #C8C7CC;
	margin-right: 10upx;
}
uni-button:after {
	    border: none;
	}
</style>
