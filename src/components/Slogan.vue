<script>
  import { RouterLink, RouterView } from 'vue-router';
</script>
<template>
    <section class="slogan">
      <div class="container sloganContainer">
        <div class="sloganPhraseContainer">
          <p class="sloganPhrase">Экологически прогрессивная уличная обувь, которая поможет вам #БытьСнаружи</p>
        </div>
      </div>
    </section>
</template>
<style>
  .sloganContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 320px;
  }
  .sloganPhraseContainer{
    text-align: center;
    max-width: 39rem;
  }
  .sloganPhrase{
    font-size: 40px;
    font-weight: 600;
  }
</style>