<script>
    import { RouterLink } from 'vue-router';
</script>
<template>
    <section class="helpBlock">
        <div class="container helpBlockContainer">
            <div class="helpBlockPhraseContainer">
                <h2 class="helpBlockMainName">Нужна помощь?</h2>
                <p class="helpBlockPhrase">Наши специалисты готовы помочь вам по почте в любое удобное для вас время</p>
                <p class="helpBlockContactPhrase">Напишите нам на <router-link to="/" class="underLine">atlas-shoes@gmail.com</router-link></p>
            </div>
        </div>
    </section>

    <!-- ToDo: Провести адаптив для самоё маленькой ширины, а особенно в блоке Ecology и карточка слайдера и подобных -->
    <!-- ToDo: Оптимизировать код в плане добавления h2 и понятности -->

</template>
<style scoped>
    .helpBlock{
        background-color: #123026;
        margin-bottom: 40px;
    }
    .helpBlockContainer{
        display: flex;
        justify-content: center;
        text-align: center;
        padding-top: 80px;
        padding-bottom: 80px;
    }
    .helpBlockPhraseContainer{
        max-width: 33rem;
    }
    .helpBlockMainName {
        color: white;
        font-size: 40px;
        font-weight: 600;
    }
    .helpBlockPhrase {
        margin: 20px 0;
        color: rgba(255, 255, 255, 0.75);
        font-size: 21px;
    }
    .helpBlockContactPhrase {
        color: rgba(255, 255, 255, 0.75);
        font-size: 21px;
    }
    .underLine {
        color: rgba(255, 255, 255, 0.75);
        text-decoration: underline;
    }
</style>