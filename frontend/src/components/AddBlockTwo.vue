<script>
    import { RouterLink } from 'vue-router';
</script>
<template>
    <section class="addBlockTwo">
        <div class="container addBlockTwoContainer">
            <div class="addBlockTwoPhraseContainer">
                <p class="mainPhrase">Оставайтесь в уюте весь год</p>
                <p class="subPhrase">Наши самые продаваемые ботинки, но обновлённые</p>
                <router-link to="/" class="buyButtonTwo">Узнать больше</router-link>
            </div>
        </div>
    </section>
</template>
<style>
    .addBlockTwo{
        background-image: url(../assets/landingImage/AddBlockTwoBanner.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 80px ;
    }
    .addBlockTwoContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 720px;
        text-align: center;
    }
    .addBlockTwoPhraseContainer{
        max-width: 30rem;
    }
    .buyButtonTwo{
        display: inline-block;
        color: black;
        text-decoration: none;
        background-color: #fff;
        padding: 15px 20px;
        border: 0;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>