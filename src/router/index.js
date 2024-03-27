import { createRouter, createWebHistory } from 'vue-router'

import AboutUs from '../components/AboutUsBlock.vue'
import Bubu from '../components/MainBlock.vue'
import Main from '../components/MainBlock.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: AboutUs },
    { path: '/bubu', component: Bubu },
  ],
  scrollBehavior (to, from, savedPosition){
    return { top: 0 }
  }
})

export default router
