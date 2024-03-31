import { createRouter, createWebHistory } from 'vue-router'

import AboutUs from '../components/AboutUsBlock.vue'
import Registration from '../components/Registration.vue'
import Main from '../components/MainBlock.vue'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/about', component: AboutUs },
    { path: '/registration', component: Registration },
    { path: '/login', component:  Login},
  ],
  scrollBehavior (to, from, savedPosition){
    return { top: 0 }
  }
})

export default router
