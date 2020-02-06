<template>
	<view class="content">
		<view class="user-head">
			 <!-- <form @submit="formSubmit" @reset="formReset"> -->
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
			<!-- </form> -->
		</view>
		<view class="tab-card">
			<sun-tab :value.sync="swiperIndex" :tabList="tabSwiperList"></sun-tab>
				<swiper :current="swiperIndex" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange" class="tab-word">
					<swiper-item v-for="(swiper,index) in tabSwiperList" :key="index">
						<view style="margin:0 20px;background-color: #FFFFFF;text-align: center;">
							<image :src=img(index) mode="" class="special-img"></image>
							<view class="money">
								<p>已收款20笔，123333元</p>
								<button class="mini-btn off" type="default" size="mini">删除</button>
								<span>  </span>
								<button class="mini-btn del" type="default" size="mini">关闭</button>
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
	import mInput from '../../components/m-input.vue'
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"

	const BASE_URL = 'http://www.luominus.com/';
	import uniRequest from 'uni-request';
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','avatarUrl']),
		components: {
			sunTab,mInput,uniNavBar
		},
		data() {
			return {
				swiperIndex:0,
				index: 0,
				account: '',
				tabSwiperList: ['支付宝','微信',],
				treatmentStatu: { checked: false },
				menus : {
							"wx": {
					            "img": "http://www.luominus.com/",
					            "price": 0,
					            "count": 0,
					            "status": null
					        },
					        "zfb": {
					            "img": "http://www.luominus.com/222",
					            "price": 3000,
					            "count": 3,
					            "status": 3
					        },
					        "user_name": "收款人3",
					        "user_mobile": "17766666669"
				}
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		onLoad() {
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
							console.log(validUser[0].token)
							
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
									 	if (e.data.code === 200) {
									 		var myData = e.data.data
									 		this.menus = {
									 			"wx": {
													"img": "http://www.luominus.com/",
													"price": 0,
													"count": 0,
													"status": null
												},
												"zfb": {
													"img": "http://www.luominus.com/222",
													"price": 3000,
													"count": 3,
													"status": 3
												},
												"user_name": "收款人3",
												"user_mobile": "17766666669"
									 		}
									 		console.log(this.menus)
									 	}
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
		methods: {
			...mapMutations(['logout']),
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
			arrayChange(e){
				// console.log('数组数据返回格式');
				// console.log(e);
			},
			objectChange(e){
				// console.log('对象数据返回格式');
				// console.log(e);
			},
			swiperChange(e){
				this.swiperIndex = e.target.current;
			},
			img(img) {
				console.log(this.menus)
				if (img === 0) {
					return '../../static/img/payZFB.jpg';
				}
				else
				{
					return '../../static/img/payWX.jpeg';
				}
			},
			switchChange (e) {
				let value = e.target.value
				let that = this
				this.$set(this.treatmentStatu, 'checked', value)   // 将点击改变的状态赋给treatmentStatu.checked
				console.log(value)
				if (value && !this.havePromise) {
					if (value === true) {
						const data = {status:2}
						uniRequest.post(BASE_URL + "api/v1/Index/changeWorkStatus", data)
							.then(function(response) {
								console.log(response);
								if (response.status === 200) {
									// console.log(response);
									// 登录成功后存入缓存数据addUser
									service.addUser(data)
									uni.showToast({
										icon: 'none',
										title: '登陆成功',
									});
									// that.toMain(data.account);
									
								}
								else {
									uni.showToast({
										icon: 'none',
										title: '用户账号或密码不正确',
									});
								}
							}).catch(function(error) {
								console.log(error);
							});
					}
					// uni.showModal({
					// 	title: '提示',
					// 	content: '您还没设置接诊承诺，是否前往设置',
					// 	success: function (res) {
					// 		if (res.confirm) {
					// 			that.$emit('changePage', 1)
					// 			console.log('用户点击确定')
					// 		} else if (res.cancel) {
					// 			that.$set(that.treatmentStatu, 'checked', false)  // 手动修改switch的状态，视图会同步更新
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
				}
			}
		}
	}
</script>
<style lang="less">
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
.content {
	background: #FFFFFF;
}
.header {
	// position: relative;
	//     top: -20px;
	// 	height: 44px;
	// 	background: #fff;
	// 	width:100%;
	
	// position: fixed;
	// position: relative;
	// text-align: center;
		// .logout {
		// 	position: absolute;
		// 	top: 10upx;
		// 	right: 5upx;
		// 	color: #ff6666;
		// 	font-size: 12px;
		// }
		// .my {
		// 	margin-bottom: 25upx;
		// 	font-weight: 700;
		// 	font-size: 16px;
		// 	line-height: 30px;
		// 	text-align: center;
		// 	overflow: hidden;
		// 	white-space: nowrap;
		// 	text-overflow: ellipsis;
		// }
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
