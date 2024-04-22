import { defineStore } from 'pinia'

export const useCatalogStore = defineStore({
  id: 'catalog',
  state: () => ({
    filteredItems: [],
  }),
  getters: {
    getFilteredItems() {
      return this.filteredItems
    },
  },
  actions: {
    setFilteredItems(items) {
      this.filteredItems = items
      // Сделать прибавку к массиву а не замену
    },
  },
});
