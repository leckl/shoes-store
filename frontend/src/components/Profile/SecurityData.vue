<script setup>
import axios from 'axios'
import { ref, defineProps,  } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object().shape({
  oldPassword: yup.string().required('Заполните поле'),
  newPassword: yup.string().min(5, 'Пароль должен быть не менее 5 символов').max(32, 'Пароль должен быть не более 32 символов').required('Заполните поле'),
  confirmNewPassword: yup.string().required('Заполните поле').oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
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
  const token = localStorage.getItem('token')
  const { oldPassword, newPassword, confirmNewPassword } = passwordValues.value

  if (newPassword !== confirmNewPassword) {
    console.error('Новый пароль и его подтверждение не совпадают')
    return
  }

  axios.put('http://localhost:3001/change-password', 
  { oldPassword, newPassword },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  )
  .then(response => {
    if (response.data.length > 0) {
      console.log(response.data)
      clearFields()
    }
  })
  .catch(err => {
    console.log(err)
  })
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
        <p class="dataName">Подтверждение пароля</p>
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
  .securityData{
    color: #123026;
		display: flex;
		flex-direction: column;
		max-width: 1100px;
		padding-bottom: 50px;
  }
</style>