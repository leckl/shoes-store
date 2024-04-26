<script>
import { useCatalogStore } from '@/stores/catalog';
import axios from 'axios';
export default {
    data() {
        return {
            filters: [
                {name: 'search', localisationName: 'Поиск', isOpen: false, options: '',},
                {name: 'sizes', localisationName: 'Размеры', isOpen: false, options: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]},
                {name: 'color', localisationName: 'Цвет', isOpen: false, options: ['Чёрный', 'Белый', 'Тёмно-зелёный']},
                {name: 'category', localisationName: 'Категория', isOpen: false, options: ['Кроссовки', 'Кеды', 'Сандали']},
                {name: 'price', localisationName: 'Цена', isOpen: false, options: ['min', 'max']},
            ],
            selectedFilters: [],
            isWideScreen: window.innerWidth > 690,
            isFiltersOpen: false
        }
    },
    mounted() {
        this.filters.forEach(filter => {
            this.selectedFilters.push([]);
        });
    },
    created(){
        window.addEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize(){
            this.isWideScreen = window.innerWidth > 690
        },
        toggleFilter(key) {
            this.filters.forEach((filter, index) => {
                if (index !== key) {
                    filter.isOpen = false;
                }
            });
            this.filters[key].isOpen = !this.filters[key].isOpen;
        },
        toggleFilters() {
            this.isFiltersOpen = !this.isFiltersOpen
        },
        applyFilters() {
        const params = {};
        const catalogStore = useCatalogStore()
        this.selectedFilters.forEach((filterOptions, index) => {
            if (filterOptions.length > 0) {
                params[this.filters[index].name.toLowerCase()] = filterOptions;
            }
        });

        // Добавить фильтры для цены, размеров, цвета, скидки
        
        axios.get('http://localhost:3001/catalog', { params })
            .then(response => {
                catalogStore.setFilteredItems(response.data)
            })
            .catch(err => {
                console.log(err);
            });
        },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
    watch: {
        isFiltersOpen(newValue) {
            if (newValue) {
                document.body.classList.add('menu-open')
            } else {
                document.body.classList.remove('menu-open')
            }
        }
    },
}
</script>
<template :class="{block : isFiltersOpen}">
    <section class="filter">
        <div class="fliterContainer" >
            <div v-if="isWideScreen" v-for="(filter, key) in filters" :key="key" class="filterPoint">
                
                <div v-if="key == 0" class="filterPoint">
                    <input class="searchFiled" type="text" :placeholder="filter.localisationName" v-model="selectedFilters[key]">
                </div>

                <div v-if="key > 0" @click="toggleFilter(key)" class="filterNameContainer">
                    <p class="filterName">{{ filter.localisationName }}</p>
                    <img class="filterImage" :class="{ 'not-last': key !== filters.length }" src="../../assets/Catalog/dropDown.svg" alt="Drop down button">
                </div>
                    <ul class="filterOptions" v-if="filter.isOpen && key < filters.length - 2">
                        <li v-for="(option, optionKey) in filter.options" :key="optionKey">
                            <label class="checkBoxContainer">
                                {{ option }}
                                <input type="checkbox" class="filterCheckbox" :value="option" v-model="selectedFilters[key]">
                                <span class="fakeCheckBox"></span>
                            </label>
                        </li>
                    </ul>
                
                <!-- Последний элемент -->

                <div class="filterOptions" v-if="filter.isOpen && key == filters.length - 2">
                    <input v-for="(priceComponent, priceKey) in filter.options" :key="priceKey" class="filterInput"
                    :placeholder="priceComponent" v-model="selectedFilters[key][priceKey]" type="text">
                    <!-- <input class="filterInput" placeholder="До" v-model="selectedFilters[key]" type="text"> -->
                </div>

                <!-- <label v-if="key == filters.length - 1" class="checkBoxContainer">
                    {{ filter.localisationName }}
                    <input type="checkbox" name="filterCheckbox" class="filterCheckbox" v-model="selectedFilters[key]">
                    <span class="fakeCheckBox"></span>
                </label>
                Функционал отменён -->

                <hr v-if="key !== 0">
                <button @click="applyFilters" v-if="key == filters.length - 1" class="filterSubmit">Готово</button>
            </div>

            <!-- Мобильная версия -->

            <div v-if="!isWideScreen">
                <div @click="toggleFilters" class="filtersIcon">
                    <img src="../../assets/Catalog/filtersIcon.svg" alt=""> <label>Фильтры</label>
                </div>

                <div v-if="isFiltersOpen" class="filters__mobile">
                    <div  v-for="(filter, key) in filters" :key="key" class="filterPoint__mobile">
                        <div v-if="key == 0" class="filterPoint__mobile">
                            <input class="searchFiled" type="text" :placeholder="filter.localisationName" v-model="selectedFilters[key]">
                        </div>

                <div v-if="key > 0" @click="toggleFilter(key)" class="filterNameContainer">
                    <p class="filterName">{{ filter.localisationName }}</p>
                    <img class="filterImage" :class="{ 'not-last': key !== filters.length }" src="../../assets/Catalog/dropDown.svg" alt="Drop down button">
                </div>
                    <ul class="filterOptions" v-if="filter.isOpen && key < filters.length - 2">
                        <li v-for="(option, optionKey) in filter.options" :key="optionKey">
                            <label class="checkBoxContainer">
                                {{ option }}
                                <input type="checkbox" class="filterCheckbox" :value="option" v-model="selectedFilters[key]">
                                <span class="fakeCheckBox"></span>
                            </label>
                        </li>
                    </ul>
                
                <!-- Последний элемент -->

                <div class="filterOptions" v-if="filter.isOpen && key == filters.length - 2">
                    <input v-for="(priceComponent, priceKey) in filter.options" :key="priceKey" class="filterInput"
                    :placeholder="priceComponent" v-model="selectedFilters[key][priceKey]" type="text">
                    <!-- <input class="filterInput" placeholder="До" v-model="selectedFilters[key]" type="text"> -->
                </div>

                <!-- <label v-if="key == filters.length - 1" class="checkBoxContainer">
                    {{ filter.localisationName }}
                    <input type="checkbox" name="filterCheckbox" class="filterCheckbox" v-model="selectedFilters[key]">
                    <span class="fakeCheckBox"></span>
                </label>
                Функционал отменён -->

                <hr v-if="key !== 0">
                <button @click="applyFilters, toggleFilters()" v-if="key == filters.length - 1" class="filterSubmit">Готово</button>
                </div>
                </div>
            </div>

        </div>
    </section>
</template>
<style>
    .searchFiled{
        width: 100%;
        border: 1px solid #123026;
        padding: 5px;
    }
    .searchFiled:focus{
        outline: none;
    }
    body.menu-open {
      overflow-y: hidden !important;
    }
    .filters__mobile{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: fixed;
        gap: 20px;
        top: 0px;
        right: 0px;
        padding-top: 170px;
        z-index: 30;
        background-color: #fff;
        height: 100%;
        width: 420px;
        text-align: right;
    }
    .filter{
        display: inline-block;
    }
    .fliterContainer{
        display: flex;
        gap: 20px;
        flex-direction: column;
    }
    .filterName{
        display: inline;
    }
    hr{
        /* margin-bottom: 20px; */
    }
    .filterPoint{
        width: 130px;
    }
    .filterPoint__mobile{
        width: 170px;
        padding-right: 20px;
    }
    .filterImage{
        float: right;
        cursor: pointer;
    }
    .filterNameContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .checkBoxContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .filterInput{
        width: 100%;
    }
    .filterSubmit{
        cursor: pointer;
        width: 100%;
        background-color: #123026;
        border: none;
        color: white;
        border-radius: 5px;
        margin-top: 15px;
        padding: 5px 0;
    }
    .filterCheckbox{
        display: none;
    }
    .fakeCheckBox{
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #123026;
        border-radius: 3px;
        position: relative;
        cursor: pointer;
    }
    .fakeCheckBox::before{
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;

        background-image: url('../../assets/Catalog/checkMark.svg');
        background-size: contain;
        background-repeat: no-repeat;
        
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);

        transition: 0.2s ease-in;
    }

    .filterCheckbox:checked + .fakeCheckBox::before {
        transform: translate(-50%, -50%) scale(1);  
    }
    .filtersIcon{
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>