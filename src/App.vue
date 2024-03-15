<script>
  import { RouterLink, RouterView } from 'vue-router';
  import MainBlock from './components/MainBlock.vue';
  export default {
    components: {
      MainBlock
    }
}
</script>

<template>
  <div class="wrapper">
    <header>
      <div class="container headerCoontainer">
        <router-link class="logo" to="/">Atlas</router-link>
        <ul class="headerNav">
          <li>
              <router-link to="/">Новинки</router-link>
          </li>
          <li>
              <router-link to="/">Скидки</router-link>
          </li>
          <li>
              <router-link to="/">Любая погода</router-link>
          </li>
          <li>
              <router-link to="/">Снег</router-link>
          </li>
          <li>
              <router-link to="/">О нас</router-link>
          </li>
        </ul>
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
  </div>

</template>

<style>
@font-face {
  font-family: Condiment;
  src: url('./assets/Condiment-Regular.ttf');
}
html{
  overflow-x: hidden;
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
@media screen and (max-width: 900px) {
  
}
</style>