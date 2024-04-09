<script>
  export default {
    data() {
      return{
        isWideScreen: window.innerWidth > 755,
      }
    },
    created(){
      window.addEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize(){
        this.isWideScreen = window.innerWidth > 755
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
  };
</script>
<template>
  <section class="aboutSupport">
    <div v-if="isWideScreen" class="aboutSupportWrapper">
      <div class="container aboutSupportContainer">
        <div class="aboutSupportTextContainer">
          <h2 class="aboutSupportMainPhrase">У нас действует тех. поддержка</h2>
          <h2 class="aboutSupportSubPhrase">Просто напишите нам</h2>
          <h2 class="aboutSupportEmailPhrase">atlas-shoes@gmail.com</h2>
          <h2>И мы постараемся помочь вам как можно скорее</h2>
        </div>
      </div>
    </div>

    <!-- Mobile version -->

    <div v-if="!isWideScreen" class="aboutSupportWrapper__mobile">
      <img class="aboutSupportImage__mobile" src="../../assets/AboutUs/AboutSupport.jpg" alt="About support">
      <div class="container aboutSupportContainer__mobile">
        <div class="aboutSupportTextContainer__mobile">
          <h2 class="aboutSupportMainPhrase">У нас действует тех. поддержка</h2>
          <h2 class="aboutSupportSubPhrase">Просто напишите нам</h2>
          <a class="aboutSupportEmailLink" href="#">Написать</a>
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
  .aboutSupportEmailLink{
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    color: #123026;
    text-decoration: none;
    margin-top: 15px;
    display: inline-block;
  }
  .aboutSupportTextContainer__mobile{
    padding: 40px 40px;
    color: #fff;
    text-align: center;
  }
  .aboutSupportImage__mobile{
    width: 100%;
    height: 210px;
    object-fit: cover;
  }
  .aboutSupportTextContainer__mobile h2{
    font-size: 25px;
  }
  .aboutSupportWrapper{
    background-image: url('../../assets/AboutUs/AboutSupport.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .aboutSupportContainer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .aboutSupportTextContainer{
    padding: 225px 0;
    text-align: center;
    color: white;
  }
  h2{
    font-size: 40px;
    font-weight: 600;
  }
  .aboutSupportEmailPhrase{
    margin-bottom: 30px
  }
  .aboutSupportWrapper__mobile{
    background-color: #123026;
  }
</style>