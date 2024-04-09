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
    validateName(value){
      if (!value) {
        return 'Заполните поле'
      }
      const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/g
      if (!nameRegex.test(value)) {
        return 'Пишите только буквы'
      }
      return true
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
  <section class="registr">
    <div class="registrContainer">
      <h2 class="registrName">Регистрация</h2>
      <Form class="registrForm" @submit="onSubmit">
        <Field placeholder="Имя" class="registrField" :rules="validateName" type="text" name="name" id="name" />
        <ErrorMessage class="alertPhrase" name="name" />
        <Field placeholder="Фамилия" class="registrField" :rules="validateName" type="text" name="surname" id="surname" />
        <ErrorMessage class="alertPhrase" name="surname" />
        <Field placeholder="Email" class="registrField" :rules="validEmail" type="email" name="email" id="email" />
        <ErrorMessage class="alertPhrase" name="email" />
        <Field placeholder="Пароль" class="registrField" :rules="validPassword" type="password" name="password" id="password" />
        <ErrorMessage class="alertPhrase" name="password" />
        <button class="registrSubmit">Зарегистрироваться</button>
        <router-link class="toLogin" to="/login">Есть аккаунт? Войти</router-link>
      </Form>
    </div>
    <EmailBlock />
  </section>
</template>
<style>
  .registrContainer{
    margin: 0 auto;
    max-width: 31.5rem;
    margin-top: 40px;
    margin-bottom: 100px;
    padding: 20px
  }
  .registrForm{
    display: flex;
    flex-direction: column;
  }
  .registrField:not(:first-child){
    margin-top: 20px;
  }
  .registrField{
    /* display: block; */
    border: none;
    padding: 15px;
    width: 100%;
    font-size: 16px;
    outline: 1px #123026 solid;
  }
  .registrField:hover{
    outline: 2px solid rgba(18, 48, 38, 0.6);
    border: none;
  }
  .registrField:focus{
    outline: 2px solid rgba(18, 48, 38, 1);
  }
  .alertPhrase{
    margin-top: 5px;
  }
  .registrName{
    font-size: 40px;
    color: #123026;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .registrSubmit{
    margin-top: 30px;
    color: white;
    background-color: #123026;
    padding: 15px;
    font-size: 16px;
    cursor: pointer;
    border: none;
  }
  .toLogin{
    color: #123026;
    text-decoration: underline;
    text-align: center;
    margin-top: 10px;
  }
</style>