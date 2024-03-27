<script>
export default {
    
}
</script>
<template>
    <section class="aboutUsAdvantages">
        <div class="container aboutUsAdvantagesContainer">
            <div class="aboutUsAdventagesName">
                <h2>Почему мы?</h2>
            </div>
            <div class="advantageContainer">
                <div class="advantage">
                    <h3>Широкий ассортимент</h3>
                    <p>Мы гордимся тем, что можем предложить вам обувь на любой вкус и для любого повода. Независимо от того, ищете ли вы удобные кроссовки для активного образа жизни, элегантные туфли для особых моментов или практичные сапоги для повседневной носки, у нас есть все, что вам нужно</p>
                </div>
                <div class="advantage">
                    <h3>Удобство и комфорт</h3>
                    <p>Мы понимаем, что правильно подобранная обувь – это не только вопрос стиля, но и здоровья ваших ног. Поэтому мы предлагаем широкий выбор моделей, разработанных с учетом анатомии стопы, с использованием инновационных технологий и материалов, обеспечивающих максимальный комфорт и поддержку</p>
                </div>
                <div class="advantage">
                    <h3>Качество</h3>
                    <p>Мы тщательно отбираем каждый бренд и каждую модель обуви, чтобы убедиться, что они соответствуют нашим высоким стандартам качества. Ваше доверие – наш главный приоритет, поэтому мы работаем только с надежными поставщиками и брендами, которые гарантируют превосходное качество своей продукции</p>
                </div>
            </div>
        </div>
        <!-- ToDo: Поправить отступы между файлами -->
    </section>
</template>
<style>
    .aboutUsAdvantages{
        margin-bottom: 50px;
    }
    .aboutUsAdventagesName{
        text-align: center;
        color: #123026;
        margin-bottom: 50px;
    }
    .aboutUsAdventagesName h2{
        font-size: 40px;
    }
    @media screen and (max-width: 750px){
        .aboutUsAdventagesName h2{
            font-size: 30px;
        }
    }
    .advantageContainer{
        display: flex;
        gap: 30px;
    }
    @media screen and (max-width: 920px){
        .advantageContainer{
            display: flex;
            flex-direction: column;
        }
        .aboutUsAdventagesName{
            margin-bottom: 30px;
        }
        .advantage{
            text-align: center;
        }

    }
    .advantage h3{
        font-size: 24px;
        color: #123026;
        margin-bottom: 20px;
    }
    .advantage p{
        color: rgba(18, 48, 38, 0.75);
        font-size: 20px;
    }
</style>