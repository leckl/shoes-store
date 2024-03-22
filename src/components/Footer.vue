<script>
    export default{
        data() {
            return {
                lists: [
                    [
                        'Магазин',
                        'Каталог',
                        'Скидки',
                        'Дождь',
                        'Любая погода',
                        'Снег',          
                    ],
                    [
                        'Информация',
                        'О нас',
                        'Контакты',
                    ],
                    [
                        'Следите за нами',
                        'YouTube',
                        'Telegram',
                    ]
                ],
            }
        },
    }
</script>
<template>
    <footer class="footer">
        <div class="container footerContainer">
            <div class="footerPhrasesContainer">
                <router-link to="/" class="footerLogo">Atlas</router-link>
                <p class="footerphrase">Современный магазин обуви, заботящийся об экологии</p>
                <p class="footerCopyright">© 2024, Atlas Все права защищены</p>
            </div>
            <ul class="footerList" v-for="(list, index) in lists" :key="index">
                <li v-for="(point, key) in list" :key="key">
                    {{ point }}
                </li>
            </ul>
        </div>
    </footer>
</template>
<style>
    ul{
        list-style-type: none;
    }
    .footer{
        background-color: #123026;
        color: white;
    }
    .footerContainer{
        display: flex;
        flex-wrap: wrap;
        padding-top: 35px !important;
        padding-bottom: 35px !important;
    }
    .footerLogo{
        color: white;
        font-family: Condiment;
        font-size: 50px;
        text-decoration: none;
    }
    .footerPhrasesContainer{
        max-width: 15rem;
    }
    .footerphrase {
        font-weight: 600;
    }
    .footerCopyright {
        margin-top: 15px;
        font-size: 13px;
        color:rgba(255, 255, 255, 0.75)
    }
    .footerPhrasesContainer,
    .footerList {
        flex-grow: 1;
        flex-basis: calc(25% - 50px);
    }
    .footerList li:first-child{
        font-weight: 600;
        margin-bottom: 10px;
        font-size: 18px;
    }
    .footerList li:not(:first-child){
        font-size: 15px;
        color: #C4CBC9;
        margin-top: 10px;
    }
</style>