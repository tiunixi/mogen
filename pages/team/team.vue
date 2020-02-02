 <template>
 	<view class="content">
 		<view class="team-head">
			<form @submit="formSubmit" @reset="formReset">
 				<view class="uni-form-item uni-column">
 				    <view class="title">团队名称</view>
 					<view class="kong">
 						
 					</view>
 				    <view class="user-switch">邀请码：452524
 				    </view>
 				</view>
				<view class="team-name">
					<view class="title">我的团队列表</view>
					<view class="kong">
						
					</view>
					<view class="user-switch"> >
					</view>
				</view>
 			</form>
 		</view>
		<view class="team-card">
			<view class="col col-one-border">
				<view class="row row-botton">
					<view class="row-center row-top row-number">10</view>
					<view class="row-center row-word">今日累积下单</view>
				</view>
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
 	</view>
 </template>
 
 <script>
 	export default {
 		components: {
 			// sunTab
 		},
 		data() {
 			return {
 				
 			}
 		},
 		onLoad() {
 
 		},
 		methods: {
			myTeam() {
				console.log(1)
				uni.navigateTo({
					url: '../team/team',
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
 		display: flex;
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
 			width: 30%;
			font-size: 34upx;
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
 