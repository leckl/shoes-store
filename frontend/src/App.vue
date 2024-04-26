<script>
  import { RouterLink, RouterView, useRouter } from 'vue-router';
  import MainBlock from './components/MainBlock.vue';
  import BurgerMenu from './components/BurgerMenu.vue';
  import Footer from './components/Footer.vue';
  import axios from 'axios';
  import { useCatalogStore } from './stores/catalog';
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
            name: 'Каталог',
            url: '/catalog'
          },
          {
            name: 'Скидки',
            url: '/catalog'
          },
          {
            name: 'Новинки',
            url: '/catalog'
          },
          {
            name: 'О нас',
            url: '/about'
          },
        ],
        isLoggenIn: false,
        isWideScreen: window.innerWidth > 990,
      }
    },
    created(){
      window.addEventListener('resize', this.handleResize)
      this.isLoggenIn = this.checkIsLoggenIn()
    },
    setup() {
      const router = useRouter();
      const catalogStore = useCatalogStore();

      const startSearch = async () => {
        const searchKeyword = this.searchKeyword.trim();

        if (searchKeyword.length > 0) {
          try {
            const response = await axios.get('http://localhost:3001/catalog', {
              params: {
                search: searchKeyword
              }
            });

            catalogStore.setFilteredItems(response.data);

            await router.push({ name: 'Catalog' })
          } catch (error) {
            console.error('Ошибка при выполнении поискового запроса:', error);
          }
        }
      };

      return {
        startSearch
      };
    },
    methods: {
      checkIsLoggenIn() {
        const token = localStorage.getItem('token')
        return token !== null
      },
      handleResize(){
        this.isWideScreen = window.innerWidth > 990
      },
      // startSearch() {
      //   const catalogStore = useCatalogStore()
      //   const searchKeyword = this.searchKeyword.trim()
      //   if (searchKeyword.length > 0) {
      //     axios.get('http://localhost:3001/catalog', {
      //       params: {
      //         search: searchKeyword
      //       }
      //     })
      //   .then(response => {
      //     catalogStore.setFilteredItems(response.data)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })

      //   }
      // }
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
          <!-- <li class="searchLine"><input v-model="searchKeyword" class="searchField" type="text"><img src="./assets/Serarch.svg" class="search" @click="startSearch" alt="Search"></li> -->
          <li v-if="!isLoggenIn" ><router-link to="/registration"><img src="./assets/Profile.svg" alt="Profile"></router-link></li>
          <li v-if="isLoggenIn"><router-link to="/profile"><img src="./assets/Profile.svg" alt="Profile"></router-link></li>
          <li><router-link to="/favorite"><img src="./assets/Catalog/toFavorite.svg" alt="Favorite"></router-link></li>
          <li><img src="./assets/Cart.svg" alt="Cart"></li>
        </ul>
      </div> 
  </header>

  <!-- ToDo: Добавить закрытие бургер меню на клик вне его и после перехода на новую страницу -->

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
@font-face {
  font-family: Roboto;
  src: url('./assets/Roboto-Regular.ttf');
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
  font-family: Roboto, 'sans-serif';
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
  right: 20px;
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
.search{
  cursor: pointer;
}
.searchLine{
  display: flex;
}
.searchField{
  border: none;
  border-bottom: 1px solid #123026;
}
.searchField:focus{
  outline: none;
}
</style>