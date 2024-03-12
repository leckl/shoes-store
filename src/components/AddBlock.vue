<script>
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
      <button class="buyButton">Купить</button>
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
  .subPhrase{
    color: #fff;
    font-size: 22px;
    margin: 15px 0;
  }
  .buyButton{
    background-color: #fff;
    padding: 15px 47px;
    border: 0;
    font-size: 15px;
    border-radius: 5px;
  }
</style>