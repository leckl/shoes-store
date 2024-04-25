<script setup>
  import { onMounted, ref } from 'vue';
  import GeneralData from './Profile/GeneralData.vue';
  import SecurityData from './Profile/SecurityData.vue';
  import axios from 'axios'

  const user = ref(null)

  onMounted(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      console.error('Токен не получен')
      return
    }

    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      user.value = JSON.parse(storedUser)
      return
    }
    
    axios.get('http://localhost:3001/user-profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  })

  const updateUser = (newUserData) => {
    const updatedUser = user.value
    for (const key in newUserData) {
      if (newUserData[key] !== '') {
        updatedUser[key] = newUserData[key]
      }
    }
    user.value = updatedUser
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }
</script>
<template>
  <div class="container profileContainer">
    <div v-if="user">
      <GeneralData :user="user" v-on:updateUser="updateUser"/>
      <SecurityData />
    </div>
  </div>
</template>
<style>
  .profileContainer{
    position: relative;
    padding-top: 50px;
    padding-bottom: 100px;
  }
</style>