<script>
  import { RouterLink } from 'vue-router';
  export default{
  data() {
    return {
    bestSellers: [
        {
          bestSellerId: 0,
          bestSellerName: 'Бестселлер 1',
          bestSellerImage: 'src/assets/landingImage/bestSellers/bestSeller1.png',
        },
        {
          bestSellerId: 1,
          bestSellerName: 'Бестселлер 1',
          bestSellerImage: 'src/assets/landingImage/bestSellers/bestSeller1.png',
        },
        {
          bestSellerId: 2,
          bestSellerName: 'Бестселлер 1',
          bestSellerImage: 'src/assets/landingImage/bestSellers/bestSeller1.png',
        },
        {
          bestSellerId: 3,
          bestSellerName: 'Бестселлер 1',
          bestSellerImage: 'src/assets/landingImage/bestSellers/bestSeller1.png',
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
      }
    }
  } 
</script>
<template>
  <section class="bestSellers">
    <div class="container bestSellersContainer">
      <h2 class="bestSellersMainName">Наши бестселлеры</h2>
      <div class="bestSellersCardContainer">
        <router-link v-for="(bestSeller, key) in bestSellers" :key="key" to="/" class="categorie">
          <img class="bestSellerImage" :src="src/assets/landingImage/bestSellers/bestSeller1.png" alt="Categories">
          <p class="bestSellerName">{{ bestSeller.bestSellerName }}<img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
        </router-link>
      </div>
    </div>
  </section>
</template>
<style>
    .bestSellersCardContainer{
        display: flex;
        gap: 8px;
    }
    .bestSellerImage{
        width: 100%;
        height: auto;
        object-fit: cover;
    }
</style>