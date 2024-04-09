<script>
  import { RouterLink } from 'vue-router';
  export default{
  data() {
    return {
    bestSellers: [
        {
          bestSellerId: 0,
          bestSellerName: 'Бестселлер 1',
          bestSellerImage: '../assets/landingImage/bestSellers/bestSeller1.jpg',
        },
        {
          bestSellerId: 1,
          bestSellerName: 'Бестселлер 2',
          bestSellerImage: '../assets/landingImage/bestSellers/bestSeller1.jpg',
        },
        {
          bestSellerId: 2,
          bestSellerName: 'Бестселлер 3',
          bestSellerImage: '../assets/landingImage/bestSellers/bestSeller1.jpg',
        },
        {
          bestSellerId: 3,
          bestSellerName: 'Бестселлер 4',
          bestSellerImage: '../assets/landingImage/bestSellers/bestSeller1.jpg',
        },
    ],
    isWideScreen: window.innerWidth > 990,
    cols: 2,
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
    },
    computed: {
    columns() {
      let columns = []
      let mid = Math.ceil(this.bestSellers.length / this.cols)
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.bestSellers.slice(col * mid, col * mid + mid))
      }
        return columns
      },
    },
  } 
</script>
<template>
  <section class="bestSellers">
    <div class="container bestSellersContainer">
      <div class="bestSellersMainNameContainer">
        <h2 class="bestSellersMainName">Наши бестселлеры</h2>
      </div>
      <div v-if="isWideScreen" class="bestSellersCardContainer">
        <router-link v-for="(bestSeller, key) in bestSellers" :key="key" to="/" class="bestSeller">
          <img class="bestSellerImage" src="../assets/landingImage/bestSellers/bestSeller1.jpg" alt="Best seller">
          <!-- Доделать лирективу :src -->
          <p class="bestSellerName">{{ bestSeller.bestSellerName }}<img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
        </router-link>
      </div>

      <!-- Mobile version -->

      <div class="bestSellersContainer__mobile" v-if="!isWideScreen">
        <div class="bestSellersColumn__mobile" v-for="(column, index) in columns" :key="index">
          <router-link to="/" class="bestSeller" v-for="(bestSeller, key) in column" :key="key">
            <img class="bestSellerImage" src="../assets/landingImage/bestSellers/bestSeller1.jpg" alt="Best seller">
            <!-- Доделать лирективу :src -->
            <p class="bestSellerName">{{ bestSeller.bestSellerName }}<img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
          </router-link>
        </div>
      </div>

      <div class="bestSellerButtonContainer">
          <router-link class="bestSellerButton" to="/">Купить бестселлеры</router-link>
      </div>
    </div>

    <!-- ToDo: Провести адаптив для самой маленькой ширины, а особенно в блоке Ecology и карточка слайдера и подобных -->
    <!-- ToDo: Оптимизировать код в плане добавления h2 и понятности -->

    <!-- ToDo: Баги при малой ширине вызывает хэдер и AddBlock. В хэдере надо добавить бургер меню а в AddBlock просто сделать всё меньше -->
    
  </section>
</template>
<style>
  .bestSellersContainer__mobile{
    display: flex;
  }
  .bestSellersColumn__mobile{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .bestSellersColumn__mobile:nth-child(odd){
    margin-right: 4px;
  }
  .bestSellers{
    margin-bottom: 80px;
  }
  .bestSellersMainNameContainer{
    text-align: center;
  }
  .bestSellersMainName{
    font-size: 40px;
    font-weight: 600;
    color: #123026;
    margin-bottom: 40px;
  }
  .bestSellersCardContainer{
      display: flex;
      gap: 8px;
  }
  .bestSellerImage{
      width: 100%;
      height: auto;
      object-fit: cover;
  }
  .bestSellerName{
    margin-top: 15px;
  }
  .bestSellerName img{
    margin-left: 7px;
  }
  .bestSeller{
    margin-bottom: 50px;
    color: #123026;
    text-decoration: none;
  }
  .bestSellerButtonContainer{
    display: flex;
    justify-content: center;
  }
  .bestSellerButton{
    color: white;
    background-color: #123026;
    padding: 15px;
    border-radius: 5px;
    text-decoration: none;
  }
</style>