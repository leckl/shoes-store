<script>
export default {
    
}
</script>
<template>
    <section class="aboutUsBriefly">
        <div class="container aboutUsBrieflyContainer">
            <div class="briefContainer">
                <div class="briefTextContainer">
                    <h2>Наша миссия</h2>
                    <p>Мы верим, что обувь имеет большее значение, чем просто защищать ваши ноги. Она может быть ключом к вашему самовыражению, помогая вам выразить свой стиль, настроение и индивидуальность. Наша миссия – вдохновлять вас на создание уникального образа, который будет отражать вашу личность и внутреннюю силу</p>
                </div>
                <div class="briefImgContainer">
                    <img src="../../assets/AboutUs/AboutUsBrief1.jpg" alt="Our mission photo">
                </div>
            </div>
            <div class="briefContainer">
                <div class="briefImgContainer">
                    <img src="../../assets/AboutUs/AboutUsBrief2.jpg" alt="Community">
                </div>
                <div class="briefTextContainer">
                    <h2>Взаимодействие с сообществом</h2>
                    <p>Мы гордимся тем, что создали не просто магазин, а настоящее сообщество любителей обуви. Мы стремимся поддерживать активное взаимодействие с нашими клиентами, делиться с ними новинками и трендами, а также предлагать эксклюзивные предложения и акции. Мы всегда рады вашим вопросам, отзывам и идеям – ваше мнение имеет для нас большое значение</p>
                </div>
            </div>
            <div class="briefContainer">
                <div class="briefTextContainer">
                    <h2>Инновации и технологии</h2>
                    <p>Мы всегда следим за последними тенденциями и инновациями в мире обуви. Мы работаем с ведущими брендами, которые постоянно разрабатывают и внедряют новые технологии для создания более комфортной, функциональной и долговечной обуви. Наши покупатели могут быть уверены, что приобретают обувь, которая не только соответствует последним трендам, но и обеспечивает передовые технологии для заботы о здоровье и комфорте их ног</p>
                </div>
                <div class="briefImgContainer">
                    <img src="../../assets/AboutUs/AboutUsBrief3.jpg" alt="Technology">
                </div>
            </div>
            <p class="gratitutePhrase">Спасибо, что выбрали Atlas – вашего надежного партнера в мире моды и комфорта для ног. Мы всегда рады помочь вам найти идеальную пару обуви!</p>
        </div>
    </section>
</template>
<style>
    .briefTextContainer{
        width: 50%;
        height: 100%;
    }
    .briefTextContainer h2{
        margin-bottom: 30px;
        color: #123026;
    }
    .briefTextContainer p{
        font-size: 20px;
        color: rgba(18, 48, 38, 0.75);
    }
    .briefImgContainer{
        width: 50%;
    }
    .aboutUsBriefly{
        margin-bottom: 50px;
    }
    .briefContainer{
        gap: 70px;
        display: flex;
        flex-direction: row;
    }
    .briefContainer:last-child{
        margin-bottom: 70px;
    }
    .briefContainer img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    .gratitutePhrase{
        text-align: center;
        font-size: 20px;
        color: rgba(18, 48, 38, 0.75);
    }
</style>