 <template>
 	<view class="content">
 		<view class="oder-head">
			<form @submit="formSubmit" @reset="formReset">
 				<view class="uni-form-item uni-column">
 				    <view class="title">开工状态</view>
 					<view class="kong">
 						
 					</view>
 				    <view class="user-switch">
 				        <switch name="switch" />
 				    </view>
 				</view>
				<view class="oder-ins">
					<view class="status">
						返款银行信息
					</view>
					<view class="">
						户名：黄祥松
					</view>
					<view class="status">
						银行：农业银行
					</view>
					<view class="">
						账号：1234543231224354432
					</view>
				</view>
 			</form>
 		</view>
		<view class="order-money">
			<view class="money-head">
				<view class="money-number">
					<p class="number">订单编号：5424</p>
					<p class="time">订单时间：2020-01-29 17：33：22</p>
				</view>
				<view class="money-prompt">
					订单支付超时取消
				</view>
			</view>
			
			<view class="oder-main">
				<view class="status">
					商户订单号：fhifdifshfdvdvdsihv
				</view>
				<view class="oder-main-money">
					交 易 金 额：
					<span>111100.00</span>
				</view>
				<view class="status">
					支 付 方 式：支付宝
				</view>
				<view class="">
					待 返 金 额：0
				</view>
				<view class="status">
					<span class="word">收  款  码：</span>
					<image class="image" src="../../static/img/payZFB.jpg" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 复制 -->
		<view class="order-money">
			<view class="money-head">
				<view class="money-number">
					<p class="number">订单编号：5424</p>
					<p class="time">订单时间：2020-01-29 17：33：22</p>
				</view>
				<view class="money-prompt">
					订单支付超时取消
				</view>
			</view>
			
			<view class="oder-main">
				<view class="status">
					商户订单号：fhifdifshfdvdvdsihv
				</view>
				<view class="oder-main-money">
					交 易 金 额：
					<span>111100.00</span>
				</view>
				<view class="status">
					支 付 方 式：支付宝
				</view>
				<view class="">
					待 返 金 额：0
				</view>
				<view class="status">
					<span class="word">收  款  码：</span>
					<image class="image" src="../../static/img/payZFB.jpg" mode=""></image>
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
		
	.oder-ins {
		border-top: 1px solid #dedede;
		width: 90%;
		margin: 20upx auto;
		font-size: 26upx;
	}
	.order-money {
		// border: 1px  #8F8F94 solid;	
		  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		border-radius: 12upx;
		margin-top: 60upx;
		height: 600upx;
		.money-head {
			display: flex;	
			.money-number {
				flex: 1;
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
				flex: 1;
				text-align: center;
				font-size: 33upx;
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
			}
		}
	}
	
	
 </style>
 