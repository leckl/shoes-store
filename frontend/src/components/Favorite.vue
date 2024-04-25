<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import axios from 'axios'

  let wishlistItems = reactive([])

  const displayWishs = () => {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3001/show-wishlist', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      wishlistItems.splice(0, wishlistItems.length, ...response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  onMounted(() => {
    displayWishs()
  })
</script>
<template>
  <div class="container favoriteContainer">
    <div v-for="item in wishlistItems" :key="item.itemId" class="item">
      <img class="itemPЯhoto" src="../../assets/Catalog/itemPhoto.png" alt="Item photo">
      <h3 class="itemName">{{ item.itemName }} <img class="toFavorite" @click="toggleFavorite" :src="favoriteIcon" alt="Favorite"></h3>
      <p class="itemCategorie">{{ item.itemCategory }}</p>
      <p class="itemPrice">{{ item.itemPrice }}$</p>
      <div class="colorsContainer">
        <div class="color" v-for="(color, id) in item.colors.split(' ')" :key="id" :style="{ backgroundColor: color }"></div>
      </div>
      <button class="itemButton">В корзину</button>
    </div>
  </div>
</template>