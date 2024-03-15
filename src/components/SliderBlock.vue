<script>

</script>
<template>
        <section class="sliderBlock">
            <div class="sliderBlockContainer">
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <p class="sliderName">Весенняя обувь</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <p class="sliderName">Весенняя обувь</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <p class="sliderName">Весенняя обувь</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <p class="sliderName">Весенняя обувь</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderButtons">

                </div>
            </div>
        </section>
</template>
<style>
    .sliderBlockContainer{
        display: flex;
        gap: 10px;
        padding: 0 20px;
        margin-bottom: 80px;
    }
    .sliderElement{
        width: 25%;
    }
    .sliderImage{
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    .sliderName{
        margin-top: 10px;
        font-weight: 600;
        color: #123026;
    }
    .sliderPrice{
        margin-top: 5px;
        color: #123026;
    }
    .sliderButton{
        margin-top: 15px;
        padding: 10px 0;
        color: #123026;
        border-radius: 5px;
        width: 100%;
        border: 1px solid #123026;
        background-color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
</style>