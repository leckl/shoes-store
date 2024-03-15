<script>
    
</script>
<template>
    <section class="addBlockTwo">
        <div class="container addBlockTwoContainer">
            <div class="addBlockTwoPhraseContainer">
                <p class="mainPhrase">Оставайтесь в уюте весь год</p>
                <p class="subPhrase">Наши самые продаваемые ботинки, но обновлённые</p>
                <button class="buyButtonTwo">Узнать больше</button>
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
        background-color: #fff;
        padding: 15px 20px;
        border: 0;
        font-size: 22px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>