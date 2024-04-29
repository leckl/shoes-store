<script setup>
  import axios from 'axios';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { onMounted, reactive, ref } from 'vue';
  import * as yup from 'yup'

  const schema = yup.object().shape({
    itemName: yup.string().required('Заполните поле'),
    itemCategory: yup.string().required('Заполните поле'),
    itemPrice: yup.number().required('Заполните поле'),
    itemMaterial: yup.number().required('Заполните поле'),
    itemLining: yup.number().required('Заполните поле'),
    itemSole: yup.number().required('Заполните поле'),
    itemSeason: yup.number().required('Заполните поле'),
  })

  const colors = reactive([])
  const sizes = reactive([])

  const getColors = () => {
    axios.get('http://localhost:3001/get-colors')
    .then(response => {
      response.data.forEach(element => {
        colors.push(element)
      })
    })
  }

  const getSizes = () => {
    axios.get('http://localhost:3001/get-sizes')
    .then(response => {
      response.data.forEach(element => {
        sizes.push(element)
      })
    })
  }

  onMounted(() => {
    getColors()
    getSizes()
  })
</script>
<template>
  <section class="addProduct">
    <h2 class="generalName">Добавление товара</h2>
    <Form class="adminForm" :validation-schema="schema">
      <h2 class="adminSubName">Основная информация</h2>
      <div class="adminFormRow">
        <label class="dataFieldContainer">
          <p class="dataName">Название</p>
          <Field class="dataField" name="itemName" id="itemName" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemName" />
        </label>
        <label class="dataFieldContainer">
          <p class="dataName">Категория</p>
          <Field class="dataField" name="itemCategory" id="itemCategory" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemCategory"/>
        </label>
        <label class="dataFieldContainer">
          <p class="dataName">Цена</p>
          <Field class="dataField" name="itemPrice" id="itemPrice" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemPrice" />
        </label>
      </div>
      <div class="adminFormRow">
        <label class="dataFieldContainer">
          <p class="dataName">Материал</p>
          <Field class="dataField" name="itemMaterial" id="itemMaterial" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemMaterial"/>
        </label>
        <label class="dataFieldContainer">
          <p class="dataName">Подкладка</p>
          <Field class="dataField" name="itemLining" id="itemLining" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemLining" />
        </label>
        <label class="dataFieldContainer">
          <p class="dataName">Подошва</p>
          <Field class="dataField" name="itemSole" id="itemSole" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemSole" />
        </label>
      </div>
      <div class="adminFormRow">
        <label class="dataFieldContainer">
          <p class="dataName">Сезон</p>
          <Field class="dataField" name="itemSeason" id="itemSeason" type="text" ></Field>
          <ErrorMessage class="alertPhrase" name="itemSeason"/>
        </label>
      </div>
    </Form>
    <div class="adminColors">
      <h2 class="adminSubName">Цвета товара</h2>
      <div class="colorsContainer">
        <div v-for="color in colors" :key="color.colorId" :style="{ backgroundColor: color.colorCode }" class="adminColor"></div>
      </div>
    </div>
    <div class="adminSizes">
      <h2 class="adminSubName">Размеры товара</h2>
      <div class="productSizesContainer">
        <div v-for="size in sizes" :key="sizes.sizeId" class="size">{{ size.size }}</div>
      </div>
    </div>
  </section>
</template>
<style>
  .addProduct{
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .adminForm{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .adminSubName{
    font-size: 30px;
  }
  .adminFormRow{
    display: flex;
    justify-content: space-between;
    gap: 5px;
    width: 100%;
  }
  .adminColors{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .adminColor{
    padding: 2%;
    border-radius: 100%;
    border: 0.5px solid black;
    cursor: pointer;
  }
</style>