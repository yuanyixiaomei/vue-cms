
import Router from 'vue-router'

import shopCar from "../pages/shopCar"
import search from "../pages/search"
import member from "../pages/member"
import home from "../pages/home"



export default new Router({
  routes: [
    {path: '/shopcar',component:shopCar},
    {path: '/search',component:search},
    {path: '/member',component:member},
    {path: '/home',component:home},

  ],
  linkActiveClass: "mui-active"
})
