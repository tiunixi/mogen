<template>
	<view class="content">
		<!-- <view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view> -->
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
		<button  type="primary" class="primary" >上传二维码</button>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import mInput from '../../components/m-input.vue'
import sunTab from '@/components/sun-tab/sun-tab.vue';
	export default {
		components: {
			sunTab,mInput
		},
		data() {
			return {
				swiperIndex:0,
				index: 0,
				account: '',
				tabSwiperList: ['支付宝','微信',],
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
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
				console.log('数组数据返回格式');
				console.log(e);
			},
			objectChange(e){
				console.log('对象数据返回格式');
				console.log(e);
			},
			swiperChange(e){
				this.swiperIndex = e.target.current;
			},
			img(img) {
				console.log(img)
				if (img === 0) {
					return '../../static/img/payZFB.jpg';
				}
				else
				{
					return '../../static/img/payWX.jpeg';
				}
			}
		}
	}
</script>

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
