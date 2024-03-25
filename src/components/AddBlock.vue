<script>
  import { RouterLink } from 'vue-router';
  export default {
    data() {
    return{
      phrase: 'Водонепроницаемый.<br>Постоянный комфорт'
    }
    }
  }
</script>
<template>
  <section class="addBlock">
  <div class="container addBlockContainter">
    <div class="addBlockPhraseContainer">
      <p class="mainPhrase">Водонепроницаемы Постоянный комфорт</p>
      <p class="subPhrase">Новая коллекция уже здесь</p>
      <router-link to="/" class="buyButton">Купить</router-link>
    </div>
  </div>
  </section>
</template>
<style>
  .addBlock{
    background-image: url(../assets/AddBlockImage.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .addBlockContainter{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 720px;
    text-align: center;
  }
  .addBlockPhraseContainer{
    max-width: 33rem;
  }
  .mainPhrase{
    font-size: 50px;
    font-weight: 600;
    color: white;
  }
  @media screen and (max-width: 520px){
    .mainPhrase{
      font-size: 30px;
    }
  }
  .subPhrase{
    color: #fff;
    font-size: 25px;
    margin: 15px 0;
  }
  .buyButton{
    display: inline-block;
    background-color: #fff;
    color: black;
    text-decoration: none;
    padding: 15px 45px;
    border: 0;
    font-size: 22px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>