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
      // wishlistItems.splice(0, wishlistItems.length, ...response.data)
      if (response.data.length > 0) {
        wishlistItems.length = 0
        response.data.forEach(item => {
          wishlistItems.push(item)
        })
      }
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
  <section class="container wishlist">
    <h2 v-if="wishlistItems.length > 0" class="wishlistName">Список желаемого</h2>
    <div v-if="wishlistItems.length > 0" class="favoriteContainer">
      <FavoriteItemCard v-for="item in wishlistItems" :key="item.itemId"
      :id="item.itemId"
      :name="item.itemName"
      :category="item.itemCategory"
      :price="item.itemPrice"
      :colors="item.colorsHex"
      @item-deleted="displayWishs"/>
    </div>

    <h2 class="wishlistEmptyMessage" v-if="wishlistItems.length < 1">Ваш список желаемого пока пуст</h2>
  </section>

</template>
<style>
  .wishlist{
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .favoriteContainer{
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .wishlistName{
    padding-bottom: 30px;
    color: #123026;
  }
  .wishlistEmptyMessage{
    color: #123026;
    text-align: center;
  }
</style>