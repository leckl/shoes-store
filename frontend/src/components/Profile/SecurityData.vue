<script setup>
import axios from 'axios'
import { ref, defineProps,  } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object().shape({
  oldPassword: yup.string().required('Заполните поле'),
  newPassword: yup.string().min(5, 'Пароль должен быть не менее 5 символов').max(32, 'Пароль должен быть не более 32 символов').required('Заполните поле'),
  confirmNewPassword: yup.string().required('Заполните поле').oneOf([yup.ref('password')], 'Пароли не совпадают')
})

const passwordValues = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

const clearFields = () => {
  passwordValues.value.oldPassword = ''
  passwordValues.value.newPassword = ''
  passwordValues.value.confirmNewPassword = ''
}

const changePassword = () => {
  
}
</script>
<template>
  <section class="securityData">
    <h2 class="generalName">Безопасность</h2>
    <Form :validation-schema="schema" class="dataFieldsContainer">
      <label class="dataFieldContainer">
        <p class="dataName">Старый пароль</p>
        <Field class="dataField" name="oldPassword" id="oldPassword" v-model="passwordValues.oldPassword" placeholder="*******" type="password" />
        <ErrorMessage class="alertPhrase" name="oldPassword" />
      </label>
      <label class="dataFieldContainer">
        <p class="dataName">Новый пароль</p>
        <Field class="dataField" name="newPassword" id="newPassword" v-model="passwordValues.newPassword" placeholder="*******" type="password" />
        <ErrorMessage class="alertPhrase" name="newPassword" />
      </label>
      <label class="dataFieldContainer">
        <p class="dataName">Подтверждение нового пароля</p>
        <Field class="dataField" name="confirmNewPassword" placeholder="*******" id="confirmNewPassword" v-model="passwordValues.confirmNewPassword" type="password" />
        <ErrorMessage class="alertPhrase" name="confirmNewPassword" />
      </label>
    </Form>
    <div class="profileButtonsContainer">
      <p @click="clearFields" class="generalDataCancel">Отменить</p>
      <button @click="changePassword" class="generalDataConfirm">Сохранить</button>
    </div>
  </section>
</template>
<style>

</style>