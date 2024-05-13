<script setup>
  import router from '@/router';
  import { useRoute } from 'vue-router'
  import axios from 'axios';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { computed, onMounted, reactive, ref } from 'vue';
  import * as yup from 'yup'

  const schema = yup.object().shape({
    itemName: yup.string().required('Заполните поле'),
    itemCategory: yup.string().required('Заполните поле'),
    itemPrice: yup.number().required('Заполните поле'),
    itemMaterial: yup.string().required('Заполните поле'),
    itemLining: yup.string().required('Заполните поле'),
    itemSole: yup.string().required('Заполните поле'),
    itemSeason: yup.string().required('Заполните поле'),
  })

  const colors = reactive([])
  const sizes = reactive([])
  let selectedSizes = ref([])
  let storedSelectedSizes = ref(JSON.parse(localStorage.getItem('selectedSizes')) || [])
  let selectedColors = ref([])
  let storedSelectedColors = ref(JSON.parse(localStorage.getItem('selectedColors')) || [])
  const activeSize = 'activeSize'
  const disabledSize = 'disabledSize'
  const file = ref(null);
  let data = reactive({
    Upload: ''
  });

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

  const selectSize = (id) => {
    const index = selectedSizes.value.indexOf(sizes[id].sizeId);
    if (index === -1) {
      selectedSizes.value.push(sizes[id].sizeId);
    } else {
      selectedSizes.value.splice(index, 1);
    }
    localStorage.setItem('selectedSizes', JSON.stringify(selectedSizes.value))
    storedSelectedSizes.value = JSON.parse(localStorage.getItem('selectedSizes')) || [];
  }

  const CheckIsSizeSelected = (id) => {
    return storedSelectedSizes.value.includes(id)
  }

  const selectColor = (id) => {
    const index = selectedColors.value.indexOf(colors[id].colorId);
    if (index === -1) {
      selectedColors.value.push(colors[id].colorId);
    } else {
      selectedColors.value.splice(index, 1);
    }
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors.value))
    storedSelectedColors.value = JSON.parse(localStorage.getItem('selectedColors')) || [];
  }

  onMounted(() => {
    getColors()
    getSizes()
    const storedSizesData = JSON.parse(localStorage.getItem('selectedSizes'));
    if (storedSizesData) {
      selectedSizes.value = storedSizesData;
    }
    const storedColorsData = JSON.parse(localStorage.getItem('selectedColors'));
    if (storedColorsData) {
      selectedColors.value = storedColorsData;
    }
  })

  const clearFormData = () => {
  itemName.value = ''
  itemCategory.value = ''
  itemPrice.value = ''
  itemMaterial.value = ''
  itemLining.value = ''
  itemSole.value = ''
  itemSeason.value = ''
  selectedSizes.value = []
  selectedColors.value = []
}

  const createItem = () => {
    const itemData = {
    itemName: itemName.value,
    itemCategory: itemCategory.value,
    itemPrice: itemPrice.value,
    itemMaterial: itemMaterial.value,
    itemLining: itemLining.value,
    itemSole: itemSole.value,
    itemSeason: itemSeason.value,
    itemSizes: selectedSizes.value,
    itemColors: selectedColors.value
  }

  axios.post('http://localhost:3001/create-item', itemData)
  .then(response => {
    const itemId = response.data.itemId
    upload(itemId)
    clearFormData()
  })
  .catch(error => {
    console.log(error)
  })
  router.push({ path: `/catalog` })
}

  const setFile = (e) => {
  // file.value = e.target.files[0]
  file.value = Array.from(e.target.files)
};

const upload = (itemId) => {
  if (!Array.isArray(file.value)) {
    alert("Произошла ошибка при выборе изображений. Пожалуйста, повторите попытку.")
    return
  }
  
  const formData = new FormData();
  for (let i = 0; i < file.value.length; i++) {
    formData.append('file', file.value[i])
  }
  formData.append('itemId', itemId)
  
  if (file.value.length < 2) {
    alert("Пожалуйста, выберите хотя бы два изображения для загрузки.")
    return
  } else if (file.value.length > 4) {
    alert("Вы пытаетесь загрузить слишком много изображений. Пожалуйста, загрузите не более 4 изображений.")
    return
  }

  axios.post('http://localhost:3001/upload', formData)
  .then(res => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

onMounted(() => {
})
</script>
<template>
  <section class="addProduct">
    <h2 class="generalName">Добавление товара</h2>
    <input type="file" ref="fileInput" @change="setFile" multiple/>
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
    <!-- <div class="adminColors">
      <h2 class="adminSubName">Цвета товара</h2>
      <div class="colorsContainer">
        <div @click="selectColor(colorKey)" v-for="(color, colorKey) in colors" :key="colorKey" :style="{ backgroundColor: color.colorCode }" class="adminColor"></div>
      </div>
    </div> -->
    <div class="adminSizes">
      <h2 class="adminSubName">Размеры товара</h2>
      <div class="productSizesContainer">
        <div @click="selectSize(sizeKey)" v-for="(size, sizeKey) in sizes" :key="sizeKey" 
        :class="{ [activeSize]: CheckIsSizeSelected(sizeKey + 1), [disabledSize]: !CheckIsSizeSelected(sizeKey + 1) }">{{ size.size }}</div>
      </div> 
    </div>
    <button class="addProductButton" @click="createItem">Добавить товар</button>
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
    border: 2px solid white;
    outline: 0.7px solid black;
    cursor: pointer;
  }
  .disabledSize{
    cursor: pointer;
    border-radius: 50px;
    border: 1px solid #123026;
    padding: 9px 15px;
    color: #123026;
  }
  .activeSize{
    cursor: pointer;
    border-radius: 50px;
    border: 1px solid #123026;
    background-color: #123026;
    padding: 9px 15px;
    color: #fff;
  }
  .addProductButton{
    background-color: #123026;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    border: none;
    padding: 15px;
    margin-bottom: 50px;
  }
</style>