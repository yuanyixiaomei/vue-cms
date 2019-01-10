
import Vue from "vue"
import Router from 'vue-router'

import shopCar from "../pages/shopCar"
import search from "../pages/search"
import member from "../pages/member"
import home from "../pages/home"
import newsList from "../pages/newsList"
import newsInfo from "../pages/newsInfo"
import photoList from "../pages/photoList"
import photoInfo from "../pages/photoInfo"
import goodsList from "../pages/goodsList"
import goodsInfo from "../pages/goodsInfo"
import goodsDesc from "../pages/goodsDesc"
import goodsComment from "../pages/goodsComment"
Vue.use(Router)
                      
export default new Router({
  routes: [
    {path: '/',redirect:"/home"},
    {path: '/shopcar',component:shopCar},
    {path: '/search',component:search},
    {path: '/member',component:member},
    {path: '/home',component:home},
    {path: '/home/newsList',component:newsList},
    {path: '/home/newsList/newsInfo/:id',component:newsInfo},
     {path: '/home/photoList',component:photoList},
    {path: '/home/photoInfo/:id',component:photoInfo},
    {path: '/home/goodsList',component:goodsList},
    {path: '/home/goodsInfo/:id',component:goodsInfo,name:"goodsInfo"},
    {path: '/home/goodsDesc/:id',component:goodsDesc,name:"goodsDesc"},
    {path: '/home/goodsComment/:id',component:goodsComment,name:"goodsComment"},


  ],
  linkActiveClass: "mui-active"
})
