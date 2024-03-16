<script>
    import { RouterLink } from 'vue-router';
    export default {
        data() {
            return {
                products: [
                    {
                        productId: 0,
                        productName: 'Обувь 1',
                        productPrice: '199$',
                        productStock: true
                    },
                    {
                        productId: 1,
                        productName: 'Обувь 2',
                        productPrice: '199$',
                        productStock: true
                    },
                    {
                        productId: 2,
                        productName: 'Обувь 3',
                        productPrice: '199$',
                        productStock: false
                    },
                    {
                        productId: 3,
                        productName: 'Обувь 4',
                        productPrice: '199$',
                        productStock: true
                    }
                ],
            }
        },
        computed: {
            name(){
                for (let i = 0; i <= this.products.length; i++) {
                    return this.products.map(product => product.productName) 
                }
            },
            isStock(){
                return this.products.productStock
            }
        },
    };
</script>
<template>
        <section class="sliderBlock">
            <div class="sliderBlockContainer">
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <div class="soldOut" v-if="isStock">Sold out!</div>
                    <p class="sliderName">{{ name }}</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <div class="soldOut" v-if="isStock">Sold out!</div>
                    <p class="sliderName">{{ name }}</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <div class="soldOut" v-if="isStock">Sold out!</div>
                    <p class="sliderName">{{ name }}</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
                <div class="sliderElement">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <div class="soldOut" v-if="isStock">Sold out!</div>
                    <p class="sliderName">{{ name }}</p>
                    <p class="sliderPrice">199$</p>
                    <button class="sliderButton">Add to cart</button>
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
        cursor: pointer;
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
    .soldOut{
        padding: 5px 15px;
        color: #fff;
        background-color: #123026;
    }
</style>