<script setup>
import axios from 'axios';
import { ref } from 'vue';

const email = ref('')

const addEmail = () => {
  const token = localStorage.getItem('token')

  axios.post('http://localhost:3001/add-email', {
    email: email,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Добавлено')
  })
  .catch(error => {
    console.log(error)
  })
};
</script>
<template>
  <section class="emailBlock">
    <div class="container emailBlockContainer">
      <div class="emailBlockPhraseContainer">
        <h2 class="emailBlockMainName">Давайте оставаться на связи</h2>
        <p class="emailBlockPhrase">Получайте первыми эксклюзивные предложения, скидки и новости о последних трендах! Подпишитесь сейчас и оставайтесь в курсе моды и выгодных возможностей!</p>
        <div class="emailBlockInputContainer">
          <input placeholder="E-mail" v-model="email" type="text" name="email" id="emailBlockInput">
          <button @click="addEmail" class="emailBlockButton">Подписаться</button>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .container{
  padding: 0px 20px;
  max-width: 1300px;
  margin: 0 auto;
  }
  .emailBlock{
    background-color: #f3f3f3;
  }
  .emailBlockContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px  ;
  }
  .emailBlockPhraseContainer{
    text-align: center;
    max-width: 36rem;
  }
  .emailBlockMainName{
    color: #123026;
    font-size: 40px;
  }
  .emailBlockPhrase{
    color: #123026;
    font-size: 21px;
    margin: 20px 0;
  }
  .emailBlockInputContainer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #emailBlockInput{
    width: 50%;
    border-radius: 5px;
    border: 1px solid #123026;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding: 15px;
    outline: none;
    font-size: 16px;
  }
  @media screen and (max-width: 530px){
    .emailBlockButton{
      padding: 15px 5px !important;
    }
  }
  @media screen and (max-width: 440px){
    #emailBlockInput{
      width: 70%;
    }
  }
  #emailBlockInput:active{
    border: 1px solid #123026;
    outline: none;
  }
  .emailBlockButton{
    cursor: pointer;
    background-color: #123026;
    color: white;
    font-weight: 600;
    padding: 15px 23px;
    border: 1px solid #123026;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 16px;
  }
</style>