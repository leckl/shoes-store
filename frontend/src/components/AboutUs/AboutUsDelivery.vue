<script>
export default {
    
}
</script>
<template>
    <section class="aboutUsDelivery">
        <div class="container aboutUsDeliveryContainer">
            <div class="aboutUsDeliveryPhraseContainer">
                <h2 class="aboutDeliveryPhrase">В любой точке мира</h2>
                <p class="aboutDeliveryPhrase">Atlas предлагает мировую доставку! Мы доставляем товары почти в любую точку мира, чтобы вы могли наслаждаться нашей обувью и аксессуарами, где бы вы ни находились</p>
            </div>
        </div>
    </section>
</template>
<style>
    .aboutUsDelivery{
        background-image: url(../../assets/AboutUs/AboutUsDelivery.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .aboutDeliveryPhrase{
        color: #fff;
    }
    .aboutUsDeliveryContainer{
        display: flex;
        justify-content: center;
    }
    .aboutUsDeliveryPhraseContainer{
        text-align: center;
        color: white;
        padding: 150px 0;
        max-width: 57rem;
        font-size: 20px;
    }
    .aboutUsDeliveryPhraseContainer p{
        margin-top: 15px;
    }
    .aboutUsDelivery{
        margin-bottom: 50px;
    }
</style>