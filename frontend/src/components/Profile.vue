<script setup>
  import { onMounted, reactive, ref } from 'vue';
  import GeneralData from './Profile/GeneralData.vue';
  import SecurityData from './Profile/SecurityData.vue';
  import AddProduct from './AddProduct.vue'
  import axios from 'axios'
  import router from '@/router';

  let user = reactive([])

  onMounted(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      console.error('Токен не получен')
      return
    }



    // if (storedUser) {
    //   user.value = JSON.parse(storedUser)
    //   return
    // }
    
    axios.get('http://localhost:3001/user-profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      response.data.forEach(UserDetail => {
        user.push(UserDetail)
      })
      localStorage.setItem('user', JSON.stringify(response.data))
    })
    .catch(err => {
      console.log(err)
      router.push('/')
    })
  })

  const updateUser = (newUserData) => {
    const updatedUser = user.value
    for (const key in newUserData) {
      if (newUserData[key] !== '') {
        updatedUser[key] = newUserData[key]
      }
    }
    // user.value = updatedUser
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    router.push('/')
  }
</script>
<template>
  <div class="container profileContainer">
    <div v-for="userDetail in user" v-if="user">
      <div v-if="userDetail.role === 'user'" class="userInfo">
        <GeneralData :user="user" v-on:updateUser="updateUser"/>
        <SecurityData />
      </div>
      <div v-if="userDetail.role === 'admin'" class="adminInfo">
        <AddProduct />
      </div>
      <button @click="logOut" class="logOutButton">Выйти</button>
    </div>
  </div>
</template>
<style>
  .profileContainer{
    position: relative;
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .logOutButton{
    border-radius: 5px;
		background-color: #E92424;
		color: #fff;
		padding: 15px 33px;
		border: none;
		font-size: 16px;
    cursor: pointer;
  }
</style>