
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/login/login","pages/reg/reg","pages/pwd/pwd","pages/order/order","pages/team/team","pages/user/user"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fff","backgroundColor":"#fff"},"tabBar":{"color":"#7a7e83","selectedColor":"#ff6666","backgroundColor":"#fff","list":[{"pagePath":"pages/main/main","text":"首页","iconPath":"static/img/home.png","selectedIconPath":"static/img/homeHL.png"},{"pagePath":"pages/order/order","text":"订单","iconPath":"static/img/order.png","selectedIconPath":"static/img/orderHL.png"},{"pagePath":"pages/user/user","text":"我的二维码","iconPath":"static/img/user.png","selectedIconPath":"static/img/userHL.png"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"mogen","compilerVersion":"2.5.1","entryPagePath":"pages/main/main","networkTimeout":{"request":6000,"connectSocket":6000,"uploadFile":6000,"downloadFile":6000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"摩根国际"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/reg/reg","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/pwd/pwd","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/order/order","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"订单"}},{"path":"/pages/team/team","meta":{},"window":{"navigationBarTitleText":"我的团队"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","titleNView":{"buttons":[{"text":"退出","fontSize":"14px","color":"#ff6666","width":"auto"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});
