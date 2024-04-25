  <script>
  import axios from 'axios';
  import Filter from './Catalog/Filter.vue';
  import CatalogItemCard from './Catalog/CatalogItemCard.vue'
  import { useCatalogStore } from '@/stores/catalog';
  export default {
    components: {
      Filter,
      CatalogItemCard,
    },
    data() {
      return {
        items: [],
        consformity: [],
        isWideScreen: window.innerWidth > 690,
      }
    },
    computed: {
      searchResults() {
        const catalogStore = useCatalogStore()
        return catalogStore.getFilteredItems
      },
      filteredItems() {
        const catalogStore = useCatalogStore()
        return catalogStore.getFilteredItems
      }
    },
    mounted() {
      this.fetchItems()
    },
    methods: {
      handleResize(){
        this.isWideScreen = window.innerWidth > 690
      },
      fetchItems() {
      axios.get('http://localhost:3001/catalog')
        .then(response => {
          const catalogStore = useCatalogStore() // Изменено: Получаем хранилище
          catalogStore.setFilteredItems(response.data); // Изменено: Установка отфильтрованных элементов
        })
        .catch(err => {
          console.log(err)
      })
      },
      applyFilters(filteredItems) {
        const catalogStore = useCatalogStore();
        let savedItems = catalogStore.getFilteredItems(); // Получить сохраненные результаты SQL-запроса
        savedItems = savedItems.filter(item => filteredItems.includes(item)); // Применяем фильтры к сохраненным результатам
        catalogStore.setFilteredItems(savedItems); // Устанавливаем новые отфильтрованные элементы
      },
      colorsConformity() {
        axios.get('http://localhost:3001/colorsConformity')
        .then(response => {
          this.consformity = response.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      // redirectToProduct(id) {
      //   this.$router.push({ name: 'Item', params: {id: id}})
      // },
    },
    created() {
      window.addEventListener('resize', this.handleResize)
      const catalogStore = useCatalogStore()
      this.filteredItems = catalogStore.filteredItems
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
  }
  </script>
  <template>
    <section class="catalog">
      <div class="container catalogContainer">
        <section class="filters">
          <Filter class="catalogItemCard" @apply-filters="applyFilters"/>
        </section>
        <section class="catalogGrid">
          <CatalogItemCard  v-for="item in filteredItems" :key="item.itemId" 
          :id="item.itemId"
          :name="item.itemName" 
          :category="item.itemCategory"
          :price="item.itemPrice"
          :colors="item.colorsHex"/>
        </section>
      </div>
    </section>
  </template>
  <style>
    .catalog{
      padding-top: 50px;
    }
    .catalogGrid{
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .catalogItemCard{
      padding-right: 15px;
    }
    .catalogContainer{
      display: flex;
    }
    @media screen  and (max-width: 690px){
      .catalogContainer{
        display: block;
      }
    }
  </style>