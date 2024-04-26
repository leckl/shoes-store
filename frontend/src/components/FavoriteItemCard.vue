<script setup>
import axios from 'axios';
    
  const props = defineProps({
    id: {
      type: Number, 
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
    },
    colors: {
      type: String,
    },
  })

  const emit = defineEmits(['item-delete'])

  const deleteFromWishlist = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Вы не авторизованы. Войдите в свою учетную запись, чтобы добавить товар в список желаемого.')
      return
    }

    axios.post('http://localhost:3001/delete-from-wishlist',
    { itemId: props.id },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Товар удалён из списка')
      localStorage.setItem(`favorite_${props.id}`, false)
      emit('item-deleted')
    })
    .catch(err => {
      console.log(err)
    })
  }
</script>
<template>
  <div class="item">
    <img @click="redirectToProduct(id)" class="itemPhoto" src="../assets/Catalog/itemPhoto.png" alt="Item photo">
    <h3 class="itemName">{{ name }} <img class="toFavorite" @click="deleteFromWishlist" src="../assets/Catalog/toFavoriteSelected.svg" alt="Favorite"></h3>
    <p class="itemCategorie">{{ category }}</p>
    <p class="itemPrice">{{ price }}$</p>
    <div class="colorsContainer">
      <div class="color" v-for="(color, id) in colors.split(' ')" :key="id" :style="{ backgroundColor: color }"></div>
    </div>
    <button class="itemButton">В корзину</button>
  </div>
</template>
<style>
</style>