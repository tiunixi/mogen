<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">手机号：</text>
				<m-input type="text" focus clearable v-model="mobile" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">姓</text><text class="title special">名：</text>
				<m-input type="text" clearable v-model="name" placeholder="请输入姓名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">邀请码：</text>
				<m-input type="text" clearable v-model="referrer_code" placeholder="请输入邀请码"></m-input>
			</view>	
			<view class="input-row">
				<text class="title">密</text><text class="title special">码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import uniRequest from 'uni-request';
	const BASE_URL = 'http://www.luominus.com';
	export default {
		components: {
			mInput
		},
		data() {
			return {
				mobile: '',
				password: '',
				name: '',
				referrer_code: ''
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.mobile.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return;
				}

				const data = {
					mobile: this.mobile,
					pwd: this.password,
					name: this.name,
					referrer_code: this.referrer_code,
				}
				// const newdata = {
				// 	account: this.name,
				// 	pwd: this.password
				// }
				uniRequest.post(BASE_URL + "/api/v1/User/reg", data)
					.then(function(response) {
						if (response.status === 200) {
							console.log(response);
							if (response.data.code === 0){
								uni.showToast({
									icon: 'none',
									title: response.data.msg,
								});
							}
							if (response.data.code === 200){
								uni.showToast({
									icon: 'none',
									title: '注册成功，请等待审核后登陆',
									 duration: 2000
								});
								//延迟1.5s
								setTimeout(function() {   
									uni.reLaunch({
										url: '../login/login',
									});  
								}, 1500);  	
								// service.addUser(newdata)
							}
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
		}
	}
</script>

<style scoped lang="less">
	
.input-row {
		
	.title {
		width:auto
	}
}
	
.letterSp{
	letter-spacing:8px;
}
.special {
	padding-left: 19px;
}
</style>
