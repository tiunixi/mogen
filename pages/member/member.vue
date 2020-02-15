<template>
	<view class="content">
		<view class="member-all">
				<view class="money-head" v-for="(item,index) in members">
					<view class="money-number">
						<p class="number">成员： {{item.name}}</p>
					</view>
					<view class="money-prompt">
						<!-- {{order.order_status}} -->
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-db">
									<picker @change="bindPickerChange" :value="item.status===0?item:item.status===1?1:2" :range="array" range-key="name">
										<view class="uni-input" @click="newclick(item.id)">{{item.status===0?array[index].name:item.status===1?array[1].name:array[2].name}}</view>
									</picker>
								</view>
							</view>
						</view>
					</view>
				</view>
<!-- 复制 -->
			</view>
		</view>
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
					array: [{name:'待选择状态'},{name: '通过'}, {name:'驳回'}],
					index: 0,
					members: [],
					newIndex:-1,
		 		}
		 	},
			onLoad: function (option) {
			 //    const item = JSON.parse(decodeURIComponent(option.item));
				// console.log(item)
				let validUser = service.getUsers();
				const newData = {
					token:validUser[0].token
				}
					uni.request({
					url:BASE_URL + "api/v1/Index/getGroupList",  
					data: newData,  
					method:'GET',  
					dataType:'json',  
					header:{  
						'content-type':'application/json'  
					},
					success: (e) =>{
						if (e.statusCode === 200) {
							if (e.data.code === 200) {
							console.log(e)
							this.members =e.data.data.map((value,index) => {
								return {
									id:value .id,
									mobile:value.mobile,
									name:value.name,
									status:value.status,
								};
							});
							console.log(this.members)
							}else {
								uni.showToast({
			 					icon: 'none',
			 					title: e.data.msg,
								duration: 1000
			 				});
							}
						}
					},
					fail() {
						console.log("失败");
					},
				})
			},
		 	methods: {
				newclick: function(index){
					this.newIndex =index
					console.log(this.newIndex)
				},
				bindPickerChange: function(e) {
					if (e.target.value !==0) {
						
					console.log('picker发送选择改变，携带值为：' + e.target.value)
					this.index = e.target.value 
					let validUser = service.getUsers();
					var newData = {
						token:validUser[0].token,
						id: this.newIndex,
						status: e.target.value
					}
					uni.request({
						url:BASE_URL + "api/v1/Index/changeGroupUser",  
						data: newData,  
						method:'GET',  
						dataType:'json',  
						header:{  
							'content-type':'application/json'  
						},
						success: (e) =>{
							if (e.statusCode === 200) {
								if (e.data.code === 200) {
								console.log(e)
								uni.showToast({
									title: '修改成功',
									icon: 'success',
									duration: 1000
								})
								let validUser = service.getUsers();
								const newData = {
									token:validUser[0].token
								}
									uni.request({
									url:BASE_URL + "api/v1/Index/getGroupList",  
									data: newData,  
									method:'GET',  
									dataType:'json',  
									header:{  
										'content-type':'application/json'  
									},
									success: (e) =>{
										if (e.statusCode === 200) {
											if (e.data.code === 200) {
											console.log(e)
											this.members =e.data.data.map((value,index) => {
												return {
													id:value .id,
													mobile:value.mobile,
													name:value.name,
													status:value.status,
												};
											});
											console.log(this.members)
											}else {
												uni.showToast({
												icon: 'none',
												title: e.data.msg,
												duration: 1000
											});
											}
										}
									},
									fail() {
										console.log("失败");
									},
								})
								}else {
									
									uni.showToast({
										title: e.data.msg,
										icon: 'success',
										duration: 1000
									})
								}
							}
						},
						fail() {
							console.log("失败");
						},
					})
				}else {
					uni.showToast({
						title: '请选择通过或者驳回',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
	background: #FFFFFF;
}
.member-all {
	// display: flex;
	border-radius: 12upx;
	// border: 1upx solid #8F8F94;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
	width: 100%;
}
	
.border {
	border-top: 1upx solid #8F8F94;
}
.menber {
	width: 90%;
	margin: 20upx auto;
	// color: #acacac;
	font-size: 30upx;
	.people {
		margin: 10upx 0;
	}
	.border{
		border-top: 1px solid #dedede;
	}
}
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
</style>
