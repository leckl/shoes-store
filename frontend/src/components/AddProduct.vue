<script setup>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup'

  const schema = yup.object().shape({
    itemName: yup.string().required('Заполните поле'),
    itemPrice: yup.number().required('Заполните поле')
  })
</script>
<template>
  <Form class="adminForm" :validation-schema="schema">
    <Field class="adminField" placeholder="Название" name="itemName" id="itemName" type="text" ></Field>
    <ErrorMessage class="alertPhrase" name="itemName" />
    <Field class="adminField" placeholder="Название" name="itemPrice" id="itemPrice" type="text" ></Field>
    <ErrorMessage class="alertPhrase" name="itemPrice" />
  </Form>
</template>
<style>
  .adminForm{
    display: flex;
  }
  .adminField{
    
  }
</style>