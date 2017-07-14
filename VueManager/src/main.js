// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routeConfig from './router-config'

import store from './store.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'

Vue.use(Element)


//加载路由中间件
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    // modify request
    //request.method = 'POST';//在请求之前可以进行一些预处理和配置
    //continue to next interceptor
    next(function(response) {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        //response.body = '...';
        var data = response.body;
        if(data.code == -1000) {
        	     alert("跳转到登录界面");
                __VUE__.$router.push({ path: '/login'});
        }
        else {
            return response;
        }
    });
});
//Vue.http.options="http://menhai.qianchengwl.cn/admin/Place/addSiteProperty";
//定义路由
const router = new VueRouter({
  routes: routeConfig
})
var __VUE__ = new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
})