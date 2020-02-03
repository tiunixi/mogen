 <template>
 	<view class="content">
 		<view class="main-head">
			<form @submit="formSubmit" @reset="formReset">
				<view class="all-money border">
					<view class="title">694.17</view>
					<view class="kong">
						
					</view>
					<view class="yuan">总收益（元）</view>
					<!-- <view class="user-switch">总收益（元）</view> -->
				</view>
 				<view class="uni-form-item uni-column">
 				    <view class="title">开工状态</view>
 					<view class="kong">
 						
 					</view>
 				    <view class="user-switch">
 				        <switch name="switch" />
 				    </view>
 				</view>
				<view class="main-border">
					<view class="status">
						当前状态：启用
					</view>
					<view class="">
						当前额度：10000.00
					</view>
				</view>
 			</form>
 		</view>
		<view class="main-acrd">
			<view class="col col-one-border">
				<view class="row row-botton">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
				<view class="row row-botton">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
				<view class="row">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
			</view>
			<view class="col">
				<view class="row row-botton">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
				<view class="row row-botton">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
				<view class="row">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
			</view>
		</view>
		<button  type="primary" class="primary" @tap="myTeam()" >管理我的团队</button>
 	</view>
 </template>
 
 <script>
	 import {
	 	mapState
	 } from 'vuex';
	 import service from '../../service.js';
	 import mInput from '../../components/m-input.vue';
	 export default {
	 	computed: mapState(['forcedLogin', 'hasLogin', 'userName','avatarUrl']),
		components: {
			mInput
		},
		data() {
			return {
				
			}
		},
		methods: {
			myTeam() {
				console.log(1)
				uni.navigateTo({
					url: '../team/team',
				});
			}
		},
	 	onLoad() {
	 		if (!this.hasLogin) {
				let validUser = service.getUsers();
				if (validUser.length !== 0) {
					// 存在缓存数据getUsers（）对象
					// 如果存在缓存,需要根据缓存的信息请求数据
					// this.toMain(this.account);
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
			width: 45%;
		}
		.yuan {
			width: 25%;
			font-size: 22upx;
			color: #c5c5c5;
		}
	}
 	.main-head {
 		display: flex;
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
		
	.main-border {
		border-top: 1px solid #dedede;
		width: 90%;
		margin: 20upx auto;
		color: #acacac;
		font-size: 26upx;
		.status {
			margin: 10upx 0;
		}
	}
	.main-acrd {
		// border: 1px  #8F8F94 solid;	
		  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		border-radius: 12upx;
		margin-top: 60upx;
		height: 500upx;
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
	
	
	.primary {
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 33px;
	}
 </style>
 