<script>
  import { RouterLink, RouterView } from 'vue-router';
  import MainBlock from './components/MainBlock.vue';
  import BurgerMenu from './components/BurgerMenu.vue';
  import Footer from './components/Footer.vue';
  export default {
    components: {
      MainBlock,
      BurgerMenu,
      Footer,
    },
    data() {
      return {
        navs: [
          {
            name: 'Новинки',
            url: '/'
          },
          {
            name: 'Скидки',
            url: '/'
          },
          {
            name: 'Любая погода',
            url: '/'
          },
          {
            name: 'Снег',
            url: '/'
          },
          {
            name: 'О нас',
            url: '/about'
          },
        ],
        isWideScreen: window.innerWidth > 990,
      }
    },
    created(){
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize(){
        this.isWideScreen = window.innerWidth > 990
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    }
}
</script>
<template>
  <div class="wrapper">
    <header>
      <div class="container headerCoontainer">
        <BurgerMenu v-if="!isWideScreen"/>
        <router-link class="logo" to="/">Atlas</router-link>
        <nav>
          <ul v-if="isWideScreen" class="headerNav">
            <li v-for="(nav, key) in navs" :key="key">
              <router-link :to="`${nav.url}`">{{ nav.name }}</router-link>
            </li>
          </ul>
        </nav>
        <ul class="svgHeaderMenu">
          <li><img src="./assets/Serarch.svg" alt="Search"></li>
          <li><img src="./assets/Profile.svg" alt="Profile"></li>
          <li><img src="./assets/Cart.svg" alt="Cart"></li>
        </ul>
      </div> 
  </header>
  <main>
    <router-view></router-view>
  </main>
  <Footer></Footer>
  </div>
</template>

<style>
body.menu-open {
  overflow-y: hidden !important;
}
@font-face {
  font-family: Condiment;
  src: url('./assets/Condiment-Regular.ttf');
}
body{
  overflow-x: hidden;
}
html, body{
  height: 100%;
}
body{
  margin: 0px;
}
*{
  margin: 0;
  padding: 0;
  font-family: Roboto;
  box-sizing: border-box;
}
.container{
  padding: 0px 20px;
  max-width: 1300px;
  margin: 0 auto;
}
header{
  background-color: #fff;
  position: sticky;
  width: 100%;
  z-index: 50;
  top: 0px;
  border-bottom: 1px solid rgba(18, 48, 38, 0.1);
}
.headerCoontainer{
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100px;
}
.logo{
  color: #123026;
  font-family: Condiment;
  font-size: 50px;
  text-decoration: none;
  margin-right: 55px;
}
.headerNav{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  list-style-type: none;
}
.headerNav li a{
  color: rgba(18, 48, 38, 0.75);
  text-decoration: none;
}
.svgHeaderMenu{
  position: absolute;
  right: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  list-style-type: none;
}
@media screen and (max-width: 340px) {
  .svgHeaderMenu{
    right: 15px;
  }
}
</style>