<script>
export default {
    data() {
        return {
            contacts: [
                {
                    name: 'Номер',
                    contact: '8 987 654 32 10',
                },
                {
                    name: 'Почта',
                    contact: 'atlas-shoes@gmail.com',
                },
                {
                    name: 'Телеграм',
                    contact: '@atlas-shoes',
                },
            ]
        }
    },
}
</script>
<template>
    <section class="aboutUsContact">
        <div class="container aboutUsContactContainer">
            <div class="aboutUsContactContainerName">
                <h2>Контакты</h2>
            </div>
            <div class="contactContainer">
                <div v-for="(contact, key) in contacts" :key="key" class="contact">
                    <h3>{{ contact.name }}</h3>
                    <p>{{ contact.contact }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    .aboutUsContact{
        margin-bottom: 100px;
    }
    .aboutUsContactContainerName{
        text-align: center;
        margin-bottom: 30px;
        color: #123026;
    }
    .contactContainer{
        display: flex;
        justify-content: center;
        text-align: center;
        gap: 70px;
    }
    .contact{
        color: #123026;
    }
    .contact h3{
        font-weight: normal;
        font-size: 30px;
        text-decoration: underline;
        margin-bottom: 15px;
    }
    .contact p{
        font-size: 24px;
    }
    @media screen and (max-width: 755px){
        .contactContainer{
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }
</style>