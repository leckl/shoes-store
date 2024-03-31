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
        <Field class="loginField" :rules="validEmail" type="email" name="email" id="email" />
        <ErrorMessage class="alertPhrase" name="email" />
        <Field class="loginField" :rules="validPassword" type="password" name="password" id="password" />
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
  
</style>