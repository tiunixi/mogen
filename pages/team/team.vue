 <template>
 	<view class="content">
 		<view class="team-head">
 				<view class="uni-form-item uni-column">
 				    <view class="title">团队名称: {{menus.group_name}}</view>
 				    <view class="user-switch">邀请码：{{menus.referrer_code}}
 				    </view>
 				</view>
				<view class="team-name" @click="toMember()">
					<view class="title">我的团队列表</view>
					<view class="kong">
						
					</view>
					<view class="user-switch"> >
					</view>
				</view>
 		</view>
		<view class="team-card">
			<view class="col col-one-border">
				<view class="row row-botton">
					<view class="row-center row-top row-number">{{menus.all}}</view>
					<view class="row-center row-word">团队总业绩</view>
				</view>
				<view class="row row-botton">
					<view class="row-center row-top row-number">{{menus.today_price}}</view>
					<view class="row-center row-word">今日业绩</view>
				</view>
				<view class="row row-botton">
					<view class="row-center row-top row-number">{{menus.week_price}}</view>
					<view class="row-center row-word">本周业绩</view>
				</view>
				<view class="row">
					<view class="row-center row-top row-number">{{menus.last_week_price}}</view>
					<view class="row-center row-word">上周业绩</view>
				</view>
			</view>
			<view class="col">
				<view class="row row-botton">
					<view class="row-center row-top row-number">{{menus.my_all}}</view>
					<view class="row-center row-word">我的总收入</view>
				</view>
				<view class="row row-botton">
					<view class="row-center row-top row-number">{{menus.today_income}}</view>
					<view class="row-center row-word">今日收益</view>
				</view>
				<view class="row row-botton">
					<view class="row-center row-top row-number">{{menus.week_income}}</view>
					<view class="row-center row-word">本周收益</view>
				</view><view class="row">
					<view class="row-center row-top row-number">{{menus.last_week_income}}</view>
					<view class="row-center row-word">上周收益</view>
				</view>
			</view>
		</view>
 	</view>
 </template>
 
 <script>
	 import {
	 	mapState
	 } from 'vuex';
	 import service from '../../service.js';
	 import mInput from '../../components/m-input.vue';
	 const BASE_URL = 'http://www.luominus.com/';
	 import uniRequest from 'uni-request';
 	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','avatarUrl']),
 		components: {
 			// sunTab
 		},
 		data() {
 			return {
 				menus:{
 					"group_name": " ",
					"referrer_code": " ",
					"all": 0,
					"my_all": 0,
					"today_price": 0,
					"today_income": 0,
					"week_price": 0,
					"week_income": 0,
					"last_week_price": 0,
					"last_week_income": 0
 				}
 			}
 		},
 		onLoad() {
 				if (!this.hasLogin) {
					uni.showLoading({
					    title: '加载中',
						duration: 1000
					});
 						let validUser = service.getUsers();
 						if (validUser.length !== 0) {
 							// 存在缓存数据getUsers（）对象
 							console.log(validUser[0].token)
 							
							const newData = {
								token:validUser[0].token
							}
 							setTimeout(function () {
 							    uni.hideLoading();
 							}, 2000);
 							uni.request({  
 								url:BASE_URL + "api/v1/Index/groupData",  
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
 									 			"group_name": myData.group_name,
												"referrer_code": myData.referrer_code,
												"all": myData.all,
												"my_all": myData.my_all,
												"today_price": myData.today_price,
												"today_income": myData.today_income,
												"week_price": myData.week_price,
												"week_income": myData.week_income,
												"last_week_price": myData.last_week_price,
												"last_week_income": myData.last_week_income
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
			toMember() {
				console.log(1)
				uni.navigateTo({
					url: '../member/member',
				});
			}
			
 		}
 	}
 </script>
 <style lang="scss" scoped>
 	.content {
 		background: #FFFFFF;
 	}
	
	.team-head {
 		// display: flex;
 		border-radius: 12upx;
 		// border: 1upx solid #8F8F94;
		box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		width: 100%;
 	}
	.team-name {
		display: flex;
		height: 80upx;
		line-height: 80upx;
		width: 90%;
		margin: 0 auto;
		justify-content: space-between;
		border-top: 1upx solid rgba(0,0,0,0.2);
		.title {
			width: 35%;
			font-size: 34upx;
		}	
		// .kong {
		// 	width: 40%;
		// }
		.user-switch {
			// width: 40%;
		}
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
 			width: 50%;
			font-size: 34upx;
			overflow: hidden;
 		}	
 		// .kong {
 		// 	width: 40%;
 		// }
 		.user-switch {
 			// width: 40%;
 		}
 	}
	.backgroud {
		background-color: #CCCCCC;
	}

	.team-card {
		// border: 1px  #8F8F94 solid;	
		  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		border-radius: 12upx;
		margin-top: 60upx;
		height: 700upx;
		display: flex;		
		.col {
			flex: 1;
			height: auto;
			display: flex;
			flex-direction: column;
			.row {
				flex: 1;
				.row-center {
					text-align: center;
				}
				.row-top {
					margin-top: 10%
				}
			}
		}
			
		.col-one-border {
			border-right: 1px solid rgba(0,0,0,0.2);
		}
			
		.row-botton {
			border-bottom: 1px solid rgba(0,0,0,0.2);
		}
		.row-number {
			font-size: 45upx;
		}
		.row-word{
			font-size: 25upx;
			color: #c5c5c5;
		}
	}
	
 </style>
 