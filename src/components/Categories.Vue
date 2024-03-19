<script>
  import { RouterLink } from 'vue-router';
  export default{
    data() {
      return {
        categories: [
          {
            categoriesId: 0,
            categoriesName: 'Осень',
          },
          {
            categoriesId: 1,
            categoriesName: 'Зима',
          },
          {
            categoriesId: 2,
            categoriesName: 'Весна',
          },
          {
            categoriesId: 3,
            categoriesName: 'Лето',
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
            let mid = Math.ceil(this.categories.length / this.cols)
            for (let col = 0; col < this.cols; col++) {
                columns.push(this.categories.slice(col * mid, col * mid + mid))
            }
              return columns
          }
      }
    } 
</script>
<template>
  <section class="categories">
    <div v-if="isWideScreen" class="container categoriesContaier">
      <router-link v-for="(categorie, key) in categories" :key="key" to="/" class="categorie">
        <img class="categorieImage" src="../assets/landingImage/CategoriesImg.jpg" alt="Categories">
        <p class="categoriesName">{{ categorie.categoriesName }}<img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
      </router-link>
    </div>

    <!-- Mobile version -->

    <div v-if="!isWideScreen" class="categoriesContainer__mobile">
        <div class="categoriesColumn__mobile" v-for="(column, index) in columns">
          <div class="categorieContainer__mobile" v-for="(categorie, key) in column">
            <router-link class="categorie" to="/">
              <img class="categorieImage" src="../assets/landingImage/CategoriesImg.jpg">
              <p class="categoriesName__mobile">{{ categorie.categoriesName }} <img src="../assets/landingImage/LeftMore.svg" alt="More"></p>
            </router-link>
          </div>
        </div>
    </div>
  </section>
</template>
<style>
  .categoriesContainer__mobile{
    display: flex;
    padding: 0 20px !important;
  }
  .categoriesColumn__mobile{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .categoriesColumn__mobile:not(:nth-child(even)){
    margin-right: 10px;
  }
  .categorieContainer__mobile{
    padding: 5px;
    margin: 5px;
  }
  .categoriesName__mobile{
    margin-top: 15px;
    font-weight: 600;
    margin-top: 5px;
  }
  .categories{
    margin-bottom: 80px;
  }
  .categoriesContaier{
    padding-bottom: 80px !important; 
    display: flex;
    gap: 8px;
  }
  .categorie{
    display: block;
    cursor: pointer;
    text-decoration: none;
    color: #123026;
    text-decoration: none;
  }
  .categorieImage{
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .categoriesName{
    margin-top: 15px;
    font-weight: 600;
    color: #123026;
  }
  .categoriesName__mobile img{
    margin-left: 3px;
  }
  .categoriesName img{
    margin-left: 7px;
  }
</style>