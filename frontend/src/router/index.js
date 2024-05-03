import { createRouter, createWebHistory } from 'vue-router'

import AboutUs from '../components/AboutUsBlock.vue'
import Registration from '../components/Registration.vue'
import Main from '../components/MainBlock.vue'
import Login from '../components/Login.vue'
import CatalogBlock from '../components/CatalogBlock.vue'
import ItemPage from '@/components/ItemPage.vue'
import Profile from '../components/Profile.vue'
import Favorite from '@/components/Favorite.vue'
import Cart from '@/components/Cart.vue'
import EditItem from '@/components/EditItem.vue'
import Order from '@/components/Order.vue'

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
    { name: 'Cart', path: '/cart', component: Cart },
    { name: 'Edit Item', path: '/edit-item', component: EditItem },
    { name: 'Order', path: '/order', component: Order }
  ],
  scrollBehavior (to, from, savedPosition){
    return { top: 0 }
  }
})

export default router
