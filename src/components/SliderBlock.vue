<script>
    import { vScrollLock } from '@vueuse/components'

    import { RouterLink } from 'vue-router';
    
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation } from 'swiper/modules';

    import 'swiper/css';
    import 'swiper/css/navigation';
    
    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
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
                isWideScreen: window.innerWidth > 990,
                cols: 2,
            }
        },
        created(){
            window.addEventListener('resize', this.handleResize)
        },
        methods: {
            handleResize(){
                this.isWideScreen = window.innerWidth > 990
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize)
        },
        setup() {
            return{
                modules: [Navigation],
            }
        },
        computed: {
            columns() {
                let columns = []
                let mid = Math.ceil(this.products.length / this.cols)
                for (let col = 0; col < this.cols; col++) {
                    columns.push(this.products.slice(col * mid, col * mid + mid))
                }
                return columns
            }
        }
    };
</script>
<template>
        <section class="sliderBlock">
            <swiper v-if="isWideScreen"
            :slides-per-view="4"
            :space-between="25"
            :navigation="{
                nextEl: '.swiperButtonNext',
                prevEl: '.swiperButtonPrev',
            }"
            :modules="modules"
            :allow-touch-move="false"
            class="slider"
            >
                <swiper-slide class="sliderBlockContainer" v-for="(product, index) in products" :key="index">
                    <router-link to="/" class="sliderElement">
                        <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                        <!-- <div class="soldOut" v-if="product.productIsStock">Sold out!</div> В разработке -->
                        <p class="sliderName">{{ product.productName }}</p>
                        <p class="sliderPrice">{{ product.productPrice }}</p>
                        <button class="sliderButton">Add to cart</button>
                    </router-link> 
                </swiper-slide>
                <div class="sliderButtons">
                    <img src="../assets/landingImage/Left.svg" class="swiperButtonPrev">
                    <span>1/3</span>
                    <img src="../assets/landingImage/Right.svg" class="swiperButtonNext">
                </div>
                <div class="buttonCatalogContainer">
                    <router-link class="sliderButtonCatalog" to="/">Каталог</router-link>
                </div>
            </swiper>
            
            <!-- Modile version -->

            <div v-if="!isWideScreen" class="sliderContainer__mobile">
                <div class="column__modile" v-for="(column, key) in columns" :key="key">
                    <div class="sliderBlockContainer__mobile" v-for="(product, index) in column" :key="index">
                        <router-link to="/" class="sliderElement">
                            <img class="sliderImage" src="../assets/landingImage/SliderImage.jpg" alt="Slider element">
                            <!-- <div class="soldOut" v-if="product.productIsStock">Sold out!</div> В разработке -->
                            <p class="sliderName">{{ product.productName }}</p>
                            <p class="sliderPrice">{{ product.productPrice }}</p>
                            <button class="sliderButton">Add to cart</button>
                        </router-link> 
                    </div>
                </div>
            </div>
        </section>
</template>
<style>
    .sliderContainer__mobile{
        display: flex;
        padding: 0 20px;
    }
    .column__modile{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .column__modile:not(:nth-child(even)){
        margin-right: 10px;
    }
    .sliderBlockContainer__mobile{
        padding-bottom: 5px;
        margin-bottom: 5px;
    }
    .sliderButtons{
        display: flex;
        gap: 30px;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
    }
    .swiperButtonNext, .swiperButtonPrev{
        cursor: pointer;
        display: block;
        width: 57px;
        height: 45px;
        padding: 15px;
    }
    .buttonCatalogContainer{
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
    }
    .sliderButtonCatalog{
        padding: 15px 30px;
        color: #123026;
        border: 1px solid #123026 ;
        border-radius: 5px;
        text-decoration: none;
    }
    .slider{
        padding: 0 20px;
    }
    .sliderBlockContainer{
        gap: 15px;
        margin-bottom: 40px;
    }
    .sliderElement{
        color: black;
        text-decoration: none;
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