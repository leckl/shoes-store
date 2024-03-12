import { createRouter, createWebHistory } from 'vue-router'

import Bebe from '../components/AddBlock.vue'
import Bubu from '../components/MainBlock.vue'
import Main from '../components/MainBlock.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/bebe', component: Bebe },
    { path: '/bubu', component: Bubu },
  ]
})

export default router
