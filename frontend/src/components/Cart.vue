<script setup>
  import axios from 'axios';
  import CartItemCard from './CartItemCard.vue'
import { onMounted, reactive } from 'vue';
  
  let cartItems = reactive([])

  const displayCart = () => {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3001/get-cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.length > 0) {
        cartItems.length = 0
        response.data.forEach(item => {
          cartItems.push(item)
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  onMounted(() => {
    displayCart()
  })
</script>
<template>
  <div class="container cartContainer">
    <section class="cartItems">
      <CartItemCard v-for="item in cartItems" :key="item.itemId"
      :id="item.itemId"
      :name="item.itemName"
      :category="item.itemCategory"
      :price="item.itemPrice"
      :colors="item.colorsHex"/>
    </section>
    <section class="cartDetails">

    </section>
  </div>
</template>
<style>
  .cartItems{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>