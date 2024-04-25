<script setup>
import axios from 'axios';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRoute } from 'vue-router'
import EmailBlock from './EmailBlock.vue';
import { Navigation } from 'swiper/modules';

const route = useRoute()
const itemId = route.params.id
const item = ref({})
const imgs = [1, 2, 3, 4]
const images = ref([])
let isWideScreen = ref(window.innerWidth > 750)
let modules = [Navigation]

onMounted(() => {
  fetchItem()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  isWideScreen.value = window.innerWidth > 750
}

const fetchItem = async () => {
  axios.get(`http://localhost:3001/item/${itemId}`)
  .then(response => {
    item.value = response.data
    loadImages()
  })
  .catch(error => {
    console.error(error)
  })
}

const loadImages = () => {
  images.value = imgs.map(id => {
    return new URL(`../assets/Items/Item${itemId}-${id}.png`, import.meta.url).href
  })
}

</script>
<template>
  <section class="itemPage">
    <div v-if="isWideScreen" class="container itemContainer">
      <div class="itemImgContainer">
        <div class="row">
          <img v-for="(image, id) in images.slice(0, 2)" :key="id" :src="image" class="itemImage" alt="Item image">
        </div>
        <div v-if="images.length > 2" class="row">
          <img v-for="(image, id) in images.slice(2)" :key="id" :src="image" class="itemImage" alt="Item image">
        </div>
      </div>
      <div v-for="(itemInfo, key) in item" :key="key" class="itemInfoContainer">
        <div class="productNameContainer">
          <p class="productName">{{ itemInfo.itemName }}</p>
          <img class="toFavorite" src="../assets/Catalog/toFavorite.svg" alt="Favorite">
        </div>
        <p class="productCategory">{{ itemInfo.itemCategory }}</p>
        <p class="productPrice">{{ itemInfo.itemPrice }}$</p>
        <p class="productSubName">Размеры</p>
        <div class="productSizesContainer">
          <div v-for="(size, sizeKey) in itemInfo.sizes.split(' ')" class="size">{{ size }}</div>
        </div>
        <p class="productSubName">Цвета</p>
        <swiper v-if="itemInfo.colors.split(' ').length > 3" class="colorsSlider"
        :slides-per-view="3.1"
        :space-between="10"
        :modules="Navigation"
        >
        <swiper-slide v-for="(colorPhoto, colorPhotoKey) in itemInfo.colors.split(' ')" :key="colorPhotoKey">
          <img src="../assets/Items/Item1-1.png" class="colorImage" alt="Color image">
        </swiper-slide>
        </swiper>
        <div v-else-if="itemInfo.colors.split(' ').length <= 3" class="productColorsContainer">
          <img v-for="(colorPhoto, colorPhotoKey) in itemInfo.colors.split(' ')" :key="colorPhotoKey" src="../assets/Items/Item1-1.png" class="colorImage" :style="{ width: 100 / itemInfo.colors.split(' ').length + '%'}" alt="Color image">
        </div>
        <p class="productSubName">Характеристики</p>
        <div class="productSettingsContainer">
          <p class="productSetting">Материал: {{ itemInfo.itemMaterial }}</p>
          <p class="productSetting">Подкладка: {{ itemInfo.itemLining }}</p>
          <p class="productSetting">Подошва: {{ itemInfo.itemSole }}</p>
          <p class="productSetting">Сезон: {{ itemInfo.itemSeason }}</p>
        </div>
        <div class="productButtonsContainer">
          <button class="addToCartButton">Добавить в корзину</button>
          <button class="buyNowButton">Купить сейчас</button>
        </div>
      </div>
    </div>
    <div v-if="!isWideScreen" v-for="(itemInfo, key) in item" :key="key" class="container itemContainer__mobile">
      <swiper
      :slides-per-view="1.05"
      :space-between="5"
      :navigation="{
        nextEl: '.swiperButtonNext',
        prevEl: '.swiperButtonPrev',
      }"
      :modules="modules"
      :allow-touch-move="false"
      class="productSliderMobile"
      >
        <swiper-slide v-for="(image, id) in images" :key="id">
          <img :src="image" class="productSliderImage" alt="Color image">
        </swiper-slide>
        <div class="sliderButtons">
            <img src="../assets/landingImage/Left.svg" class="swiperButtonPrev">
            <span>1/3</span>
            <img src="../assets/landingImage/Right.svg" class="swiperButtonNext">
        </div>
      </swiper>
      <div class="productNameContainer">
        <p class="productName">{{ itemInfo.itemName }}</p>
        <img class="toFavorite" src="../assets/Catalog/toFavorite.svg" alt="Favorite">
      </div>
      <p class="productCategory">{{ itemInfo.itemCategory }}</p>
      <p class="productPrice">{{ itemInfo.itemPrice }}$</p>
      <p class="productSubName">Размеры</p>
      <div class="productSizesContainer">
        <div v-for="(size, sizeKey) in itemInfo.sizes.split(' ')" class="size">{{ size }}</div>
      </div>
      <p class="productSubName">Цвета</p>
      <swiper v-if="itemInfo.colors.split(' ').length > 3" class="colorsSlider"
      :slides-per-view="3.1"
      :space-between="10"
      :modules="Navigation"
      >
      <swiper-slide v-for="(colorPhoto, colorPhotoKey) in itemInfo.colors.split(' ')" :key="colorPhotoKey">
        <img src="../assets/Items/Item1-1.png" class="colorImage" alt="Color image">
      </swiper-slide>
      </swiper>
      <div v-else-if="itemInfo.colors.split(' ').length <= 3" class="productColorsContainer">
        <img v-for="(colorPhoto, colorPhotoKey) in itemInfo.colors.split(' ')" :key="colorPhotoKey" src="../assets/Items/Item1-1.png" class="colorImage" :style="{ width: 100 / itemInfo.colors.split(' ').length + '%'}" alt="Color image">
      </div>
      <p class="productSubName">Характеристики</p>
      <div class="productSettingsContainer">
        <p class="productSetting">Материал: {{ itemInfo.itemMaterial }}</p>
        <p class="productSetting">Подкладка: {{ itemInfo.itemLining }}</p>
        <p class="productSetting">Подошва: {{ itemInfo.itemSole }}</p>
        <p class="productSetting">Сезон: {{ itemInfo.itemSeason }}</p>
      </div>
      <div class="productButtonsContainer">
        <button class="addToCartButton">Добавить в корзину</button>
        <button class="buyNowButton">Купить сейчас</button>
      </div>
    </div>
    <EmailBlock/>
  </section>
</template>
<style>
  .itemPage{
    padding-top: 50px;
  }
  .itemContainer{
    display: flex;
    gap: 50px;
    padding-bottom: 80px;
  }
  .itemImgContainer{
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .row {
    display: flex;
    gap: 15px;
  }
  .itemImage{
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
  .itemInfoContainer{
    width: 32%;
    color: #123026;
  }
  @media screen and (max-width: 900px){
    .itemInfoContainer{
      width: 50%;
    }
  }
  .productNameContainer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .productName{
    font-size: 40px;
    font-weight: 600;
    padding-right: 10px;
  }
  @media screen and (max-width: 1070px){
    .productName{
      font-size: 32px;
    }
  }
  @media screen and (max-width: 902px){
    .productName{
      font-size: 26px;
    }
  }
  .productCategory{
    font-weight: 300;
    padding-bottom: 10px;
  }
  .productPrice{
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 15px;
  }
  .productSubName{
    font-weight: 600;
    font-size: 22px;
  }
  .productSizesContainer{
    padding-top: 15px;
    padding-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  .size{
    border-radius: 50px;
    border: 1px solid #123026;
    padding: 9px 15px;
  }
  .colorsSlider{
    padding-top: 15px;
    padding-bottom: 20px;
  }
  .productColorsContainer{
    padding-top: 15px;
    padding-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  .colorImage{
    height: 100%;
    object-fit: cover;
  }
  .productSettingsContainer{
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding-top: 15px;
  }
  .productButtonsContainer{
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    gap: 15px;
  }
  .addToCartButton{
    width: 100%;
    padding: 15px 0;
    border-radius: 5px;
    border: 1px solid #123026;
    background-color: #fff;
    font-size: 16px;
  }
  .buyNowButton{
    width: 100%;
    padding: 15px 0;
    border-radius: 5px;
    color: #fff;
    border: none;
    background-color: #123026;
    font-size: 16px;
  }
  .itemContainer__mobile{
    padding-bottom: 80px;
    color: #123026;
  }
  .productSliderMobile{
    width: 100%;
  }
  .productSliderImage{
    width: 100%;
  }
</style>