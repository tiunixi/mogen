import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

// import my from './my/my.js'
// var http = my.http;
 
// Vue.prototype.$http = http
// import http from './http.js'

 
// Vue.prototype.$http = http

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
