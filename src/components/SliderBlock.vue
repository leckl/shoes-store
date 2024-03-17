<script>
    import { RouterLink } from 'vue-router';
    export default {
        data() {
            return {
                products: [ //Это начальный пример работы (Позже будет выполняться с базой данных)
                    {
                        productId: 0,
                        productName: 'Обувь 1',
                        productPrice: '199$',
                        productIsStock: true
                    },
                    {
                        productId: 1,
                        productName: 'Обувь 2',
                        productPrice: '199$',
                        productIsStock: true
                    },
                    {
                        productId: 2,
                        productName: 'Обувь 3',
                        productPrice: '199$',
                        productIsStock: false
                    },
                    {
                        productId: 3,
                        productName: 'Обувь 4',
                        productPrice: '199$',
                        productIsStock: true
                    },
                    {
                        productId: 4,
                        productName: 'Обувь 5',
                        productPrice: '199$',
                        productIsStock: true
                    },
                    {
                        productId: 5,
                        productName: 'Обувь 6',
                        productPrice: '199$',
                        productIsStock: true
                    }
                ],
            }
        },
    };
</script>
<template>
        <section class="sliderBlock">
            <router-link to="/" class="sliderBlockContainer">
                <div class="sliderElement" v-for="(product, index) in products" :key="index">
                    <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                    <!-- <div class="soldOut" v-if="product.productIsStock">Sold out!</div> В разработке -->
                    <p class="sliderName">{{ product.productName }}</p>
                    <p class="sliderPrice">{{ product.productPrice }}</p>
                    <button class="sliderButton">Add to cart</button>
                </div>
            </router-link> 
        </section>
</template>
<style>
    .sliderBlockContainer{
        color: black;
        text-decoration: none;
        display: flex;
        gap: 10px;
        padding: 0 20px;
        margin-bottom: 80px;
    }
    .sliderElement{
        position: relative;
        width: 25%;
        cursor: pointer;
    }
    .sliderImage{
        position: relative;
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
        border-radius: 40px;
        font-size: 1rem;
        position: absolute;
        bottom: 8px;
        left: 10px;
        color: #fff;
        background-color: #123026;
    }
</style>