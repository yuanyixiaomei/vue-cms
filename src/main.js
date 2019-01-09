// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './App.vue'

import VueResource from 'vue-resource'

// 安装vue-resource  在此之后才可以使用Vue.$http对象
Vue.use(VueResource)

//导入路由
import router from './router/index'



//按需mint-ui样式

import mintui from 'mint-ui'
Vue.use(mintui)
import "mint-ui/lib/style.css" 

//导入mui的样式和字体和扩展样式
import "./dist/css/mui.css"
import "./dist/fonts/mui.ttf"
import "./dist/css/icons-extra.css"

// 配置全局的接口地址
Vue.http.options.root="http://www.lovegf.cn:8899/"

//vue resoure 里面改变post编码格式

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

Vue.http.options.emulateJSON = true



Vue.config.productionTip = false

// 定义全局的过滤器

// 注册
import moment from "moment"
Vue.filter('my-filter', function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
   return moment(dataStr).format(pattern);
})


import comment from './components/comment.vue'

// 定义全局组件, 参数1: 组件名 决定了将来如何使用 参数2: 组件对象
Vue.component('comment', comment)




/* eslint-disable no-new */
var vm=new Vue({
  el:"#app",
  data:{
    
  },
  render: c => c(app),
  router,
  
})