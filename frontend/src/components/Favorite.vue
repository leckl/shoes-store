<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import FavoriteItemCard from './FavoriteItemCard.vue';
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
  <div class="favoriteContainer">
    <FavoriteItemCard v-for="item in wishlistItems" :key="item.itemId"
    :id="item.itemId"
    :name="item.itemName"
    :category="item.itemCategory"
    :price="item.itemPrice"
    :colors="item.colorsHex"/>
  </div>
</template>
<style>
  .favoriteContainer{
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>