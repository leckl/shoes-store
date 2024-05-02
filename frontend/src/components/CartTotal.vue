<script setup>
  const props = defineProps({
    totalPrice: Number
  })

  const makeOrder = () => {
    
  }
</script>
<template>
  <p class="totalPrice">Сумма заказа: {{ totalPrice }}$</p>
  <p class="orderInfo">Оформляя заказ вы соглашаетесь с пользовательским соглашением</p>
  <button @click="makeOrder" class="makeOrderButton">Офоромить заказ</button>
</template>
<style>
  .makeOrderButton{
    cursor: pointer;
    background-color: #123026;
    border: none;
    border-radius: 5px;
    color: #fff;
    padding: 15px;
    font-size: 16px;
  }
  .totalPrice{
    font-size: 32px;
    font-weight: 600;
  }
  .orderInfo{
    font-size: 18px;
    font-weight: 300;
    padding: 10px 0;
  }
</style>