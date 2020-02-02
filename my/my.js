import http from '../http.js'
 
const AUTH_TOKEN = "X-Auth-Token";
 
http.setBaseUrl("http://www.luominus.com");
http.header['comp'] = "cjx913"
if (uni.getStorageSync(AUTH_TOKEN)) {
    http.header[AUTH_TOKEN] = uni.getStorageSync(AUTH_TOKEN);
}
 
http.beforeResponseFilter = function (res) {
    //X-Auth-Token
    if (res.header) {
        var respXAuthToken = res.header[AUTH_TOKEN.toLocaleLowerCase()];
        if (respXAuthToken) {
            uni.setStorageSync(AUTH_TOKEN, respXAuthToken);
            http.header[AUTH_TOKEN] = respXAuthToken;
        }
    }
    return res;
}
 
let my = {
    'http': http
}
export default my