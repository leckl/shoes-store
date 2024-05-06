<script setup>
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as yup from 'yup'
import router from '@/router';

const route = useRoute()
const colors = reactive([])
const sizes = reactive([])
const itemId = route.params.id
const editedItem = ref({})

onMounted(() => {
  fetchItem()
  getColors()
  getSizes()
})

const schema = yup.object().shape({
  itemName: yup.string().required('Заполните поле'),
  itemCategory: yup.string().required('Заполните поле'),
  itemPrice: yup.number().required('Заполните поле'),
  itemMaterial: yup.string().required('Заполните поле'),
  itemLining: yup.string().required('Заполните поле'),
  itemSole: yup.string().required('Заполните поле'),
  itemSeason: yup.string().required('Заполните поле'),
})

const fetchItem = async () => {
  axios.get(`http://localhost:3001/item/${itemId}`)
  .then(response => {
    editedItem.value = response.data[0]
    console.log(editedItem.value.sizes.split(' '))
  })
  .catch(error => {
    console.error(error)
  })
}

const getColors = () => {
  axios.get('http://localhost:3001/get-colors')
  .then(response => {
    colors.push(...response.data)
    console.log(colors[2].colorId)
  })
  .catch(error =>{
    console.log(error)
  })
}

const getSizes = () => {
  axios.get('http://localhost:3001/get-sizes')
  .then(response => {
    sizes.push(...response.data)
    console.log(sizes[9].sizeId)
  })
  .catch(error =>{
    console.log(error)
  })
}

const editItem = () => {
  axios.put(`http://localhost:3001/edit-item/${itemId}`, editedItem.value)
  .then(response => {
    console.log('Товар изменён')
  })
  .catch(error => {
    console.log(error)
  })
  router.push({ path: `/catalog` })
}
</script>
<template>
  <div class="container">
    <section class="editProduct">
      <h2 class="generalName">Изменение товара</h2>
      <Form class="adminForm" :validation-schema="schema">
        <h2 class="adminSubName">Основная информация</h2>
        <div class="adminFormRow">
          <label class="dataFieldContainer">
            <p class="dataName">Название</p>
            <Field class="dataField" v-model="editedItem.itemName" name="itemName" id="itemName" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemName" />
          </label>
          <label class="dataFieldContainer">
            <p class="dataName">Категория</p>
            <Field class="dataField" v-model="editedItem.itemCategory" name="itemCategory" id="itemCategory" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemCategory"/>
          </label>
          <label class="dataFieldContainer">
            <p class="dataName">Цена</p>
            <Field class="dataField" v-model="editedItem.itemPrice" name="itemPrice" id="itemPrice" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemPrice" />
          </label>
        </div>
        <div class="adminFormRow">
          <label class="dataFieldContainer">
            <p class="dataName">Материал</p>
            <Field class="dataField" v-model="editedItem.itemMaterial" name="itemMaterial" id="itemMaterial" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemMaterial"/>
          </label>
          <label class="dataFieldContainer">
            <p class="dataName">Подкладка</p>
            <Field class="dataField" v-model="editedItem.itemLining" name="itemLining" id="itemLining" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemLining" />
          </label>
          <label class="dataFieldContainer">
            <p class="dataName">Подошва</p>
            <Field class="dataField" v-model="editedItem.itemSole" name="itemSole" id="itemSole" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemSole" />
          </label>
        </div>
        <div class="adminFormRow">
          <label class="dataFieldContainer">
            <p class="dataName">Сезон</p>
            <Field class="dataField" v-model="editedItem.itemSeason" name="itemSeason" id="itemSeason" type="text" ></Field>
            <ErrorMessage class="alertPhrase" name="itemSeason"/>
          </label>
        </div>
      </Form>
      <div class="adminColors">
        <h2 class="adminSubName">Цвета товара</h2>
        <div class="colorsContainer">
          <div @click="selectColor(colorKey)" v-for="(color, colorKey) in colors" :key="colorKey" :style="{ backgroundColor: color.colorCode }"
          class="adminColor"></div>
        </div>
      </div>
      <div class="adminSizes">
        <h2 class="adminSubName">Размеры товара</h2>
        <div class="productSizesContainer">
          <div @click="selectSize(sizeKey)" v-for="(size, sizeKey) in sizes" :key="sizeKey"
          :class="{ 
          'activeSize': editedItem.sizes.split(' ').includes(size.size.toString()),
          'disabledSize': !editedItem.sizes.split(' ').includes(size.size.toString())}">
          {{ size.size }}</div>
        </div> 
        <button class="addProductButton" @click="editItem">Изменить товар</button>
      </div>
    </section>
  </div>
</template>

  <!-- 'disabledSize': !editedItem.sizes.split(' ').includes(size) && sizes.includes(size)  -->