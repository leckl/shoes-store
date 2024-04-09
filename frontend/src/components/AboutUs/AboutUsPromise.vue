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
    <section class="aboutUsPromise">
        <div class="aboutUsPromiseWrapper">
            <div class="container aboutUsPromiseContainer">
                <div class="aboutUsPromisePhraseContainer">
                    <h2>Мы гарантируем</h2>
                    <p>Когда вы выбираете нашу обувь, вы можете быть уверены в том, что получите не только качественный продукт, но и высокий уровень обслуживания. Наша цель – сделать ваш онлайн-покупательный опыт приятным, удобным и беззаботным</p>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    .aboutUsPromise{
        margin-bottom: 50px;
    }
    .aboutUsPromiseWrapper{
        background-image: url(../../assets/AboutUs/AboutUsPromise.png);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .aboutUsPromiseContainer{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .aboutUsPromisePhraseContainer{
        color: white;
        max-width: 57rem;
        text-align: center;
        padding: 150px 0;
    }
    .aboutUsPromisePhraseContainer h2{
        font-size: 40px;
        font-weight: 600;
    }
    @media screen and (max-width: 755px){
      .aboutUsPromisePhraseContainer h2{
        font-size: 30px;
      }
    }
    .aboutUsPromisePhraseContainer p{
        font-size: 20px;
    }
</style>