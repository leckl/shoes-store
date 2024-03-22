<script>
    export default {
        data() {
            return {
                email: ''
            }
        },
    };
</script>
<template>
    <section class="emailBlock">
        <div class="container emailBlockContainer">
            <div class="emailBlockPhraseContainer">
                <h2 class="emailBlockMainName">Давайте оставаться на связи</h2>
                <p class="emailBlockPhrase">Получайте первыми эксклюзивные предложения, скидки и новости о последних трендах! Подпишитесь сейчас и оставайтесь в курсе моды и выгодных возможностей!</p>
                <form class="emailBlockInputContainer">
                    <input placeholder="E-mail" v-model="email" type="text" id="emailBlockInput">
                    <button class="emailBlockButton">Подписаться</button>
                    <!-- Добавить функционал при написании backend -->
                </form>
            </div>
        </div>
    </section>
</template>
<style scoped>
    .emailBlock{
        background-color: #f3f3f3;
    }
    .emailBlockContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 80px 0;
    }
    .emailBlockPhraseContainer{
        text-align: center;
        max-width: 36rem;
    }
    .emailBlockMainName{
        color: #123026;
        font-size: 40px;
    }
    .emailBlockPhrase{
        color: #123026;
        font-size: 21px;
        margin: 20px 0;
    }
    .emailBlockInputContainer{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #emailBlockInput{
        min-width: 50%;
        border-radius: 5px;
        border: 1px solid #123026;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding: 15px;
        outline: none;
        font-size: 16px;
    }
    #emailBlockInput:active{
        border: 1px solid #123026;
        outline: none;
    }
    .emailBlockButton{
        width: 30%;
        cursor: pointer;
        background-color: #123026;
        color: white;
        font-weight: 600;
        padding: 15px 23px;
        border: 1px solid #123026;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-size: 16px;
    }
</style>