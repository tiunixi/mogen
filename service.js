// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const BASE_URL = 'http://www.luominus.com/';
// 公用的请求地址

// 方法一
import http from './http.js'

// 方法二
// import uniRequest from 'uni-request';

// getUsers获取缓存数据是否存储
const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

// addUser登陆成功后把数据加入缓存数据中
const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		pwd: userInfo.pwd
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

// toServicelogin登录请求
const  toServicelogin = function(form) {
	// 方法1
	// http.post(BASE_URL + "/api/v1/User/login",form)
	// .then(function (response) {
	// 		console.log("hello");
	// 		console.log(response);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});
	
	//方法二
	// uniRequest.post(BASE_URL + "api/v1/User/login", form)
	// 	.then(function(response) {
	// 		console.log(response);
	// 		return response
	// 	}).catch(function(error) {
	// 		console.log(error);
	// 	});

}
export default {
	getUsers,
	addUser,
	toServicelogin
}
