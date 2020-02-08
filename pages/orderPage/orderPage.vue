<template>
	<view class="order-money" >
		<!-- <navigator :url="'/pages/orderPage/orderPage?item='+ encodeURIComponent(JSON.stringify(item))"> -->
		<view class="money-head">
			<view class="money-number">
				<p class="number">订单编号：{{order.id}}</p>
				<p class="time">订单时间：{{order.create_time}}</p>
			</view>
			<view class="money-prompt">
				<!-- {{order.order_status}} -->
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							点击修改状态
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input">{{array[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="oder-main">
			<view class="status">
				商户订单号：{{order.order_num}}
			</view>
			<view class="oder-main-money">
				交 易 金 额：
				<span>{{order.collection_user_price}}</span>
			</view>
			<view class="status">
				支 付 方 式：{{order.pay_type}}
			</view>
			<view class="">
				待 返 金 额：{{order.order_num}}
			</view>
			<view class="status">
				返 款 状 态：{{order.back_status}}
			</view>
			<view class="status">
				<span class="word">收  款  码：</span>
				<image class="image" :src="order.img" mode=""></image>
			</view>
		</view>
		<!-- <view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
						<view class="uni-input">{{array[index].name}}</view>
					</picker>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import service from '../../service.js';
	// 公用的请求地址
	
	const BASE_URL = 'http://www.luominus.com/';
	import uniRequest from 'uni-request';
	export default {
	 	components: {
	 	},
	 	data() {
	 		return {
				// 
				array: [{name:'待确定支付'},{name: '确定支付完成'}, {name:'支付超时'}],
				index: 0,
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
					order_status_num:''
	 			}]
	 		}
	 	},
		onLoad: function (option) {
		    const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item)
			// this.index = (item.order_status_num )-1
			if (item.order_status_num === 1) {
				//待确认收款
				this.index = 0
			}else if (item.order_status_num === 2) {
				
				this.index = 1
			}else if (item.order_status_num === 3) {
				
				this.index = 2
			}
			this.order = {
					id: item.id,
					back_status: item.back_status,
					order_status: item.order_status,
					order_num: item.order_num,
					collection_code_id: item.collection_code_id, //人工
					create_time: item.create_time, //安全敏
					merchants_order_num: item.merchants_order_num, //政治敏
					collection_user_price: item.collection_user_price, //机器人对话轮数
					pay_type: item.pay_type, //机器人对话轮数
					img: item.img, //机器人对话轮数
				};
		},
	 	methods: {
			bindPickerChange: function(e) {
				console.log(e)
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value + 1
				let validUser = service.getUsers();
				var newData = {
					token:validUser[0].token,
					order_id:this.order.id,
					code_id:this.order.collection_code_id,
					order_status: this.index
					
				}
				uniRequest.post(BASE_URL + "api/v1/Index/changeOrderStatus", newData)
					.then(function(response) {
						if (response.status === 200) {
							console.log(response);
							uni.showToast({
								icon: 'none',
								title: '修改成功',
							});;
							uni.reLaunch({
								url: '../order/order',
							});
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
			
	 	}
}
</script>
<style lang="scss" scoped>
	.uni-list-cell-left {
		color: #000;
	}
	.order-money {
		font-size: 30upx;
		width:90%;
		box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
		border-radius: 12upx;
		margin: 60upx auto;
		height: 620upx;
		.money-head {
			display: flex;	
			.money-number {
				flex: 70%;
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
				flex: 30%;
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
		}
	}
	
</style>
