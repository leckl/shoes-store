import { createRouter, createWebHistory } from 'vue-router'

import Bebe from '../components/Bebe.vue'
import Bubu from '../components/Bubu.vue'
import Nav from '../components/Navmenu.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Nav },
    { path: '/bebe', component: Bebe },
    { path: '/bubu', component: Bubu },
  ]
})

export default router
