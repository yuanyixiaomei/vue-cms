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
Vue.http.options.root = "http://www.lovegf.cn:8899/"

//vue resoure 里面改变post编码格式

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

Vue.http.options.emulateJSON = true



Vue.config.productionTip = false

// 定义全局的过滤器

// 注册
import moment from "moment"
Vue.filter('my-filter', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
})


import comment from './components/comment.vue'

// 定义全局组件, 参数1: 组件名 决定了将来如何使用 参数2: 组件对象
Vue.component('comment', comment)

//导入vuex
import Vuex from "vuex"
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem("car") || "[]")



const store = new Vuex.Store({
  state: {
    //this.$store.state.***
    car: car,
  },
  mutations: {
    //this.$store.commit("方法的名称","需要传递唯一的参数")

    addToCar(state, goodsInfo) {


      //  假设没有找到
      var flag = false
      state.car.some(item => {
        // console.log(item.id);
        if (item.id === goodsInfo.id) {

          item.count += parseInt(goodsInfo.count)
          flag = true
          return true
        }

      })
      if (!flag) {
        state.car.push(goodsInfo)
      }
      //把数据存到localStorage
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    updateCount(state, goodsInfo) {
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count = parseInt(goodsInfo.count)
          return true
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    removecar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      console.log("3333");
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car))
    }
  },
  getters: {
    // this.$store.getters.***
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count

      })
      return o
    },
    getGoodsSelect(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o 
    }
  }
})


/* eslint-disable no-new */
var vm = new Vue({
  el: "#app",
  data: {

  },
  render: c => c(app),
  router,
  store,

})
