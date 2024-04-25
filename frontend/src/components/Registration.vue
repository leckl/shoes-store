<script>
  import { RouterLink } from 'vue-router';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  import EmailBlock from './EmailBlock.vue';
  import axios from 'axios';
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
          userName: yup.string().max(70, 'Максимальная длина 70').required('Заполните поле'),
          userLogin: yup.string().min(4, 'Минимальная длина 4').max(50).required('Заполните поле'),
          password: yup.string().min(5, 'Пароль должен быть не менее 5 символов').max(32, 'Пароль должен быть не более 32 символов').required('Заполните поле'),
          passwordConfirmation: yup.string().required('Заполните поле').oneOf([yup.ref('password')], 'Пароли не совпадают')
        }),
      }
    },
    methods: {
      onSubmit(values){
        console.log(JSON.stringify(values, undefined, 2));
        axios.post('http://localhost:3001/sing-up', values)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      },
    },
}
</script>
<template>
  <section class="registr">
    <div class="registrContainer">
      <h2 class="registrName">Регистрация</h2>
      <Form class="registrForm" :validation-schema="schema" @submit="onSubmit">
        <Field placeholder="Имя" class="registrField" type="text" name="userName" id="userName" />
        <ErrorMessage class="alertPhrase" name="userName" />
        <Field placeholder="Логин" class="registrField" type="text" name="userLogin" id="userLogin" />
        <ErrorMessage class="alertPhrase" name="userLogin" />
        <Field placeholder="Пароль" class="registrField" type="password" name="password" id="password" />
        <ErrorMessage class="alertPhrase" name="password" />
        <Field placeholder="Повторите пароль" class="registrField"  type="password" name="passwordConfirmation" id="confirmPassword" />
        <ErrorMessage class="alertPhrase" name="passwordConfirmation" />
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