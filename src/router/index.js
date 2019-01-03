
import Vue from "vue"
import Router from 'vue-router'

import shopCar from "../pages/shopCar"
import search from "../pages/search"
import member from "../pages/member"
import home from "../pages/home"
import newsList from "../pages/newsList"
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:"/home"},
    {path: '/shopcar',component:shopCar},
    {path: '/search',component:search},
    {path: '/member',component:member},
    {path: '/home',component:home},
    {path: '/home/newsList',component:newsList},


  ],
  linkActiveClass: "mui-active"
})
