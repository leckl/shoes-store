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
      <section class="telegramBlock">
    <div class="container telegramBlockContainer">
      <div class="telegramBlockMainNameContainer">
        <h2 class="telegramBlockMainName">Следите за нами в Телеграм</h2>
        <router-link class="telegramBlockLink" to="/">@atlas-shoes</router-link>
      </div>
      <div v-if="isWideScreen" class="telegramBlockCardContainer">
        <router-link v-for="(bestSeller, key) in bestSellers" :key="key" to="/" class="telegramImageContainer">
          <img class="telegramBlockImage" src="../assets/landingImage/bestSellers/bestSeller1.jpg" alt="Telegram inage">
          <!-- Доделать лирективу :src -->
        </router-link>
      </div>

      <!-- Mobile version -->

      <div class="telegramBlockContainer__mobile" v-if="!isWideScreen">
        <div class="telegramBlockColumn__mobile" v-for="(column, index) in columns" :key="index">
          <router-link to="/" class="telegramImageContainer" v-for="(bestSeller, key) in column" :key="key">
            <img class="telegramBlockImage" src="../assets/landingImage/bestSellers/bestSeller1.jpg" alt="Best seller">
            <!-- Доделать лирективу :src -->
          </router-link>
        </div>
      </div>
    </div>

    <!-- ToDo: Провести адаптив для самой маленькой ширины, а особенно в блоке Ecology и карточка слайдера и подобных -->
    <!-- ToDo: Оптимизировать код в плане добавления h2 и понятности -->

  </section>
</template>
<style>
  .telegramBlockContainer__mobile{
    display: flex;
  }
  .telegramBlockColumn__mobile{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .telegramBlockColumn__mobile:nth-child(odd){
    margin-right: 4px;
  }
  .telegramBlock{
    margin-bottom: 80px;
  }
  .telegramBlockMainNameContainer{
    text-align: center;
  }
  .telegramBlockMainName{
    font-size: 40px;
    font-weight: 600;
    color: #123026;
  }
  .telegramBlockLink{
    display: inline-block;
    font-size: 40px;
    font-weight: 600;
    text-decoration: none;
    padding-bottom:0;
    border-bottom: 3px solid #123026;
    color: #123026;
    margin-bottom: 40px;
    outline: none;
  }
  .telegramBlockCardContainer{
      display: flex;
      gap: 8px;
  }
  .telegramBlockImage{
      width: 100%;
      height: auto;
      object-fit: cover;
  }
</style>