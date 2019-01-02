// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './App.vue'

//导入路由
import vueRouter from "vue-router"


Vue.use(vueRouter)

import router from './router/index'
//按需导入头部样式
import { Header } from 'mint-ui'

Vue.component(Header.name, Header)


//导入mui的样式和字体和扩展样式
import "./dist/css/mui.css"
import "./dist/fonts/mui.ttf"
import "./dist/css/icons-extra.css"


Vue.config.productionTip = false

/* eslint-disable no-new */
var vm=new Vue({
  el:"#app",
  render: c => c(app),
  router,
})