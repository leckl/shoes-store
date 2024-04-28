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
    quantity: {
      type: Number,
    },
  })

  const emits = defineEmits(['quantity-increase', 'quantity-decrease'])

  const increaseQuantity = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Вы не авторизованы. Войдите в свою учетную запись, чтобы добавить товар в список желаемого')
      return
    }

    axios.put('http://localhost:3001/increase-quantity', {
      itemId: props.id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Количество товара в корзине увеличено')
    })
    .catch(error => {
      console.log(error)
    })

    emits('quantity-increase', props.id)
  }

  const decreaseQuantity = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Вы не авторизованы. Войдите в свою учетную запись, чтобы добавить товар в список желаемого')
      return
    }

    axios.put('http://localhost:3001/decrease-quantity', {
      itemId: props.id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Количество товара в корзине увеличено')
    })
    .catch(error => {
      console.log(error)
    })

    emits('quantity-decrease', props.id)
  }
</script>
<template>
  <div v-if="quantity > 0" class="cartItem">
    <img class="cartItemImg" src="../assets/Catalog/cartItemPhoto.png" alt="Item image">
    <div class="cartItemInfo">
      <div class="cartItemSubInfo"><p class="cartItemName">{{ name }}</p>
        <div class="quantity"><p @click="decreaseQuantity" class="quantityMinusButton">-</p><p class="quantityInfo">{{ quantity }}</p><p @click="increaseQuantity" class="quantityPlusButton">+</p></div>
      </div>
      <p class="cartItemCategory">{{ category }}</p>
      <div class="cartColorsContainer">
        <div class="color" v-for="(color, id) in colors.split(' ')" :key="id" :style="{ backgroundColor: color }"></div>
      </div>
      <p class="itemPrice">{{ price }}$</p>
    </div>
  </div>
</template>
<style>
  .cartItem{
    display: flex;
    color: #123026;
  }
  .cartItemSubInfo{
    display: flex;
    align-items: center;
  }
  .cartItemImg{
    padding-right: 30px;
  }
  .cartItemName{
    font-size: 20px;
    font-weight: 600;
    word-break: break-all;
    overflow: hidden;
    margin-right: 10px;
  }
  .cartItemCategory{
    font-weight: 300;
    padding: 5px 0 7px;
  }
  .quantity{
    display: flex;
    align-items: center;
  }
  .quantityMinusButton{
    cursor: pointer;
    font-size: 20px;
    background-color: #f1f1f5;
    border-radius: 3px;
    padding: 0px 7px;
  }
  .quantityInfo{
    padding: 0 10px;
  }
  .quantityPlusButton{
    cursor: pointer;
    font-size: 20px;
    background-color: #f1f1f5;
    border-radius: 3px;
    padding: 0px 5px;
  }
  .cartColorsContainer{
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-bottom: 5px;
    width: 160%;
  }
  .color{
    padding: 5%;
  }
</style>