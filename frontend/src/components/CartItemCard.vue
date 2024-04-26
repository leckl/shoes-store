<script setup>
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
</script>
<template>
  <div class="cartItem">
    <img src="../assets/Catalog/itemPhoto.png" alt="Item image">
    <div class="cartItemInfo">
      <div class="cartItemSubInfo"><p>{{ name }}</p> <p>-</p><p>+</p></div>
      <p>{{ category }}</p>
      <p>{{ price }}$</p>
    </div>
  </div>
</template>
<style>
  .cartItem{
    display: flex;
  }
  .cartItemSubInfo{
    display: flex;
  }
</style>