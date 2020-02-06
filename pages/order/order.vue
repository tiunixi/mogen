<template>
 	<view class="content">
 		<view class="oder-head">
			<!-- <form @submit="formSubmit" @reset="formReset"> -->
 				<!-- <view class="uni-form-item uni-column">
 				    <view class="title">开工状态</view>
 					<view class="kong">
 						
 					</view>
 				    <view class="user-switch">
 				        <switch name="switch" />
 				    </view>
 				</view> -->
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
 			<!-- </form> -->
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
		height: 620upx;
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
				margin-bottom: 40upx;
			}
		}
	}
	
	
 </style>

 
 <!-- <template>
 	<view class="content">
		<view class="user-head">
			 <form @submit="formSubmit" @reset="formReset">
			    <view class="input-row border">
			    	<text class="title">姓 名：</text>
			    	<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号">tinuxi</m-input>
			    </view>
				<view class="input-row border">
					<text class="title">手机号：</text>
					<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号">19987183997</m-input>
				</view>
				<view class="uni-form-item uni-column">
				    <view class="title">开工状态</view>
					<view class="kong">
						
					</view>
				    <view class="user-switch">
				        <switch name="switch" />
				    </view>
				</view>
			</form>
		</view>
 		<view class="p10">普通使用</view>
 		<sun-tab :value.sync="index" :tabList="tabList"></sun-tab>
 		<view class="p10">更换颜色</view>
 		<sun-tab :value.sync="index" @change="arrayChange" :tabList="tabColorList" activeColor="#f37b1d" defaultColor="#FFFFFF" bgColor="#1e9fff"></sun-tab>
 		<view class="p10">使用icon</view>
 		<sun-tab :value.sync="index" :tabList="tabIconList" rangeKey="name"></sun-tab>
 		<view class="p10">对象赋值</view>
 		<sun-tab :value.sync="index" @change="objectChange" :tabList="tabObjectList" rangeKey="name"></sun-tab>
 		<view class="p10">横向滚动</view>
 		<sun-tab :value.sync="tabScrollIndex" :tabList="tabScrollList" :scroll="true"></sun-tab>
 		<view class="p10">搭配滑块使用</view>
 		<sun-tab :value.sync="swiperIndex" :tabList="tabSwiperList"></sun-tab>
 		<swiper :current="swiperIndex" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
 			<swiper-item v-for="(swiper,index) in tabSwiperList" :key="index">
 				<view style="margin: 20px;background-color: #FFFFFF;text-align: center;">{{swiper}}
					<view class="input-row border">
						<text class="title">姓 名：</text>
						<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号">tinuxi</m-input>
					</view>
					<view class="input-row border">
						<text class="title">手机号：</text>
						<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号">19987183997</m-input>
					</view>
					<view class="uni-form-item uni-column">
					    <view class="title">开工状态</view>
						<view class="kong">
							
						</view>
					    <view class="user-switch">
					        <switch name="switch" />
					    </view>
					</view>
				</view>
 			</swiper-item>
 		 </swiper>
		 
 	</view>
 </template>
 
 <script>
 	import sunTab from '@/components/sun-tab/sun-tab.vue';
 	export default {
 		components: {
 			sunTab
 		},
 		data() {
 			return {
 				index: 0,
 				swiperIndex:0,
 				tabList: ['选项卡一','选项卡二','选项卡三'],
 				tabColorList: ['选项卡一','选项卡二','选项卡三选项卡三项卡三'],
 				tabIconList: [
 					{
 						name: '男',
 						icon: 'iconnan',
 					},
 					{
 						name: '女',
 						icon: 'iconziyuan',
 					},
 					{
 						name: '儿童',
 						icon: 'icon10',
 					}
 				],
 				tabObjectList: [
 					{
 						name: '选项卡一',
 						value: 1
 					},
 					{
 						name: '选项卡二',
 						value: 2
 					},
 					{
 						name: '选项卡三',
 						value: 3
 					}
 				],
 				tabScrollIndex: 0,
 				tabScrollList: ['选项卡一','选项卡二选项卡二','选项卡三','选项卡四','选项卡五选项卡五选项卡五','选项卡六','选项卡七','选项卡八'],
 				tabSwiperList: ['A','B','C'],
 			}
 		},
 		onLoad() {
 
 		},
 		methods: {
 			arrayChange(e){
 				console.log('数组数据返回格式');
 				console.log(e);
 			},
 			objectChange(e){
 				console.log('对象数据返回格式');
 				console.log(e);
 			},
 			swiperChange(e){
 				this.swiperIndex = e.target.current;
 			}
 		}
 	}
 </script>
 <style lang="scss">
 	uni-page-body{
 		background-color: #f4f4f4;
 	}
 	.p10{
 		padding: 10px;
 		font-size: 16px;
 	}
 </style>
 <style lang="less" scoped>
 
 .content {
 	background: #FFFFFF;
 }
 
 .user-head {
 	display: flex;
 	border-radius: 12upx;
 	// border: 1upx solid #8F8F94;
 	box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
 }
 	
 uni-form {
 	width: 98%;
 }
 .input-row {
 	height: 100upx;
 	line-height: 100upx;
 	.title {
 		color: #8F8F94;
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
 		width: 55%;
 	}
 	.user-switch {
 		width: 15%;
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
 -->