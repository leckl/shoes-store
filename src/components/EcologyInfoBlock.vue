<script>
    import { RouterLink } from 'vue-router';
</script>
<template>
    <section class="ecologyBlock">
        <div class="container ecologyContainer">
            <div class="contentContainer">
                <div class="imageContainer">
                    <img class="ecologyImage" src="../assets/landingImage/EcologyImg.jpg" alt="Ecology image">
                </div>
                <div class="textContainer">
                    <h2 claass="textContainerName">Мы заботимся о экологии также как о клиентах</h2>
                    <p class="textContainerPhrase">В магазине Atlas мы верим в движение к зеленому будущему, шаг за шагом. Поэтому наша коллекция экологичной обуви – это не просто стиль и комфорт, это возможность оказать позитивное влияние на планету.</p>
                    <router-link class="textContainerButton" to="/">Узнать больше</router-link>
                </div>
            </div>
            <!-- ToDo: заменить большие font-size на h1, h2 и т.д. -->
        </div>
    </section>
</template>
<style>
    .ecologyBlock{
        margin: 40px 0 80px;
    }
    .contentContainer{
        display: flex;
    }
    .textContainer{
        background-color: #F3F3F3;
    }
    .ecologyImage{
        position: relative;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>