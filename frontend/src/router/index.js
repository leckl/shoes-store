import { createRouter, createWebHistory } from 'vue-router'

import AboutUs from '../components/AboutUsBlock.vue'
import Registration from '../components/Registration.vue'
import Main from '../components/MainBlock.vue'
import Login from '../components/Login.vue'
import CatalogBlock from '../components/CatalogBlock.vue'
import ItemPage from '@/components/ItemPage.vue'
import Profile from '../components/Profile.vue'
import Favorite from '@/components/Favorite.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { name: 'About', path: '/about', component: AboutUs },
    { name: 'Registration', path: '/registration', component: Registration },
    { name: 'Login', path: '/login', component:  Login},
    { name: 'Catalog', path: '/catalog', component: CatalogBlock },
    { name: 'Item', path: '/product/:id', component: ItemPage },
    { name: 'Profille', path: '/profile', component: Profile },
    { name: 'Favorite', path: '/favorite', component: Favorite },
  ],
  scrollBehavior (to, from, savedPosition){
    return { top: 0 }
  }
})

export default router
