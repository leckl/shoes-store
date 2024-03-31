<script>
  import { RouterLink } from 'vue-router';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup'
  import EmailBlock from './EmailBlock.vue';
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    EmailBlock,
  },
  methods: {
    onSubmit(values){
      console.log(JSON.stringify(values, undefined, 2));
    },
    validEmail(value){
      if (!value) {
        return 'Заполните поле'
      }
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
      if (!emailRegex.test(value)) {
        return 'Введите верный email'
      }
      return true
    },
    validPassword(value){
      if (!value) {
        return 'Заполните поле'
      }
      const passRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      if (!passRegex.test(value)) {
        return 'Пароль небезопасен'
      }
      return true
    }
  },
}
</script>
<template>
  <section class="login">
    <div class="loginContainer">
      <h2 class="loginName">Вход</h2>
      <Form class="loginForm" @submit="onSubmit">
        <Field placeholder="Email" class="loginField" :rules="validEmail" type="email" name="email" id="email" />
        <ErrorMessage class="alertPhrase" name="email" />
        <Field placeholder="Пароль" class="loginField" :rules="validPassword" type="password" name="password" id="password" />
        <ErrorMessage class="alertPhrase" name="password" />
        <!-- ToDo: После подключения backend сделать проверку на правильность данных для входа -->
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