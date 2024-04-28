<script setup>
  import axios from 'axios';
  import CartItemCard from './CartItemCard.vue'
  import CartTotal from './CartTotal.vue'
  import EmailBlock from './EmailBlock.vue';
  import { onMounted, reactive, ref } from 'vue';
  
  const cartItems = reactive([])
  const totalPrice = ref(0)

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
        calculateTotalPrice();
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const quantityIncrease = (itemId) => {
    const itemIndex = cartItems.findIndex(item => item.itemId === itemId)
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1
      calculateTotalPrice();
    }
  }

  const quantityDecrease = (itemId) => {
  const itemIndex = cartItems.findIndex(item => item.itemId === itemId);
  if (itemIndex !== -1) {
    if (cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
    } else {
      cartItems.splice(itemIndex, 1);
    }
    calculateTotalPrice();
  }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.itemPrice * item.quantity;
    });
    totalPrice.value = total;
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
      :colors="item.colorsHex"
      :quantity="item.quantity"
      @quantity-decrease="quantityDecrease"
      @quantity-increase="quantityIncrease"/>
    </section>
    <section class="cartDetails">
      <CartTotal :totalPrice="totalPrice"/>
    </section>
  </div>
  <EmailBlock />
</template>
<style>
  .cartContainer{
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .cartItems{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .cartDetails{
    max-width: 320px;
    color: #123026;
  }
</style>