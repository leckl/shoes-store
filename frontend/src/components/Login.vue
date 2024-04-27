<script>
  import { RouterLink } from 'vue-router';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup'
  import EmailBlock from './EmailBlock.vue';
  import axios from 'axios';
  import router from '@/router';
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    EmailBlock,
  },
  data() {
    return{
      schema: yup.object().shape({
        userLogin: yup.string().min(4, 'Минимальная длина 4').max(50).required('Заполните поле'),
        password: yup.string().min(5, 'Пароль должен быть не менее 5 символов').max(32, 'Пароль должен быть не более 32 символов').required('Заполните поле'),
      })
    }
  },
  methods: {
    onSubmit(values){
      axios.post('http://localhost:3001/sing-in', values)
      .then(response => {
        const token = response.data.token

        localStorage.setItem('token', token)
        router.push('/profile')
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
}
</script>
<template>
  <section class="login">
    <div class="loginContainer">
      <h2 class="loginName">Вход</h2>
      <Form class="loginForm" :validation-schema="schema" @submit="onSubmit">
        <Field placeholder="Логин" class="loginField" type="text" name="userLogin" id="userLogin" />
        <ErrorMessage class="alertPhrase" name="userLogin" />
        <Field placeholder="Пароль" class="loginField" type="password" name="password" id="password" />
        <ErrorMessage class="alertPhrase" name="password" />
        <button class="loginSubmit">Войти</button>
        <router-link class="toRegistr" to="/registration">Зарегистрироваться</router-link>
      </Form>
    </div>
  <EmailBlock />
  </section>
</template>
<style>
  .loginContainer{
    margin: 0 auto;
    max-width: 31.5rem;
    margin-top: 40px;
    margin-bottom: 100px;
    padding: 20px
  }
  .loginForm{
    display: flex;
    flex-direction: column;
  }
  .loginField:not(:first-child){
    margin-top: 20px;
  }
  .loginField{
    /* display: block; */
    border: none;
    padding: 15px;
    width: 100%;
    font-size: 16px;
    outline: 1px #123026 solid;
  }
  .loginField:hover{
    outline: 2px solid rgba(18, 48, 38, 0.6);
    border: none;
  }
  .loginField:focus{
    outline: 2px solid rgba(18, 48, 38, 1);
  }
  .alertPhrase{
    margin-top: 5px;
  }
  .loginName{
    font-size: 40px;
    color: #123026;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .loginSubmit{
    margin-top: 30px;
    color: white;
    background-color: #123026;
    padding: 15px;
    font-size: 16px;
    cursor: pointer;
    border: none;
  }
  .toRegistr{
    color: #123026;
    text-decoration: underline;
    text-align: center;
    margin-top: 10px;
  }
</style>