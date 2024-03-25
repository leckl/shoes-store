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
                    <h2 class="ecologyName">Мы заботимся о экологии также как о клиентах</h2>
                    <p class="ecologyPhrase">В магазине Atlas мы верим в движение к зеленому будущему, шаг за шагом. Поэтому наша коллекция экологичной обуви – это не просто стиль и комфорт, это возможность оказать позитивное влияние на планету.</p>
                    <router-link class="ecologyButton" to="/">Узнать больше</router-link>
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
    @media screen and (max-width: 990px) {
        .contentContainer{
            flex-direction: column;
        }
        .textContainer, .imageContainer{
            width: 100% !important;
        }
        .textContainer{
            height: auto !important;
        }
    }
    @media screen and (max-width: 420px){
        .textContainer{
            padding: 30px 15px !important;
        }
        .ecologyName{
            margin-bottom: 20px !important;
        }
    }
    .textContainer{
        width: 50%;
        background-color: #F3F3F3;
        padding: 100px 55px;
    }
    .ecologyName{
        font-size: 40px;
        color: #123026;
        margin-bottom: 50px;
    }
    .ecologyPhrase{
        color: rgba(18, 48, 38, 0.75);
        font-size: 21px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .ecologyButton{
        display: inline-block;
        color: white;
        background-color: #123026;
        padding: 15px;
        border-radius: 5px;
        text-decoration: none;
    }
    .imageContainer{
        overflow: hidden;
        width: 50%;
    }
    .ecologyImage{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>