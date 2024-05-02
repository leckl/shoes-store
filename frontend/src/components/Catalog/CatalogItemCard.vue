<script>
import axios from 'axios'
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        colors: {
            type: String,
            required: true,
        },
    },
    data() {
        return{
            inWishList: false
        }
    },
    computed: {
        favoriteIcon() {
            return this.inWishList ? new URL(`../../assets/Catalog/toFavoriteSelected.svg`, import.meta.url).href : new URL(`../../assets/Catalog/toFavorite.svg`, import.meta.url).href
        },
    },
    created() {
        const favoriteStatus = localStorage.getItem(`favorite_${this.id}`)
        if (favoriteStatus === 'true') {
            this.inWishList = true
        }
    },
    mounted() {

    },
    methods: {
        toggleFavorite() {
            this.inWishList = !this.inWishList
            localStorage.setItem(`favorite_${this.id}`, this.inWishList)

            this.addToWishlist()
        },
        redirectToProduct(id) {
            this.$router.push({ name: 'Item', params: {id: id}})
        },
        addToWishlist() {
            const token = localStorage.getItem('token')
            if (!token) {
                alert('Вы не авторизованы. Войдите в свою учетную запись, чтобы добавить товар в список желаемого')
                return
            }

            axios.post('http://localhost:3001/add-to-wishlist', {
                itemId: this.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Товар успешно добавлен в список желаемого')
            })
            .catch(error => {
                console.log(error)
                alert('Произошла ошибка при добавлении товара в список желаемого')
            });
        },
        addToCart() {
            const token = localStorage.getItem('token')
            if (!token) {
                alert('Вы не авторизованы. Войдите в свою учетную запись, чтобы добавить товар в список желаемого')
                return
            }

            axios.post('http://localhost:3001/add-to-cart', {
                itemId: this.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Товар добавлен в корзину')
            })
            .catch(error => {
                console.log(error)
                alert('Произошла ошибка при добавлении товара в корзину')
            })
        },
    }
}
</script>
    <template>
        <div class="item">
            <img @click="redirectToProduct(id)" class="itemPhoto" src="../../assets/Catalog/itemPhoto.png" alt="Item photo">
            <h3 class="itemName">{{ name }} <img class="toFavorite" @click="toggleFavorite" :src="favoriteIcon" alt="Favorite"></h3>
            <p class="itemCategorie">{{ category }}</p>
            <div class="colorsContainer">
                <div class="color" v-for="(color, id) in colors.split(' ')" :key="id" :style="{ backgroundColor: color }"></div>
            </div>
            <p class="itemPrice">{{ price }}$</p>
            <button @click="addToCart" class="itemButton">В корзину</button>
         </div>
    </template>
<style>
    .itemName{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        padding-bottom: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .itemPhoto{
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    .toFavorite{
        cursor: pointer;
        z-index: 30;
    }
    .itemCategorie{
        font-weight: 300;
        padding-bottom: 4px;
    }
    .itemPrice{
        font-size: 18px;
        font-weight: 600;
        padding-bottom: 15px;
    }
    .colorsContainer{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        padding-bottom: 4px;
        width: 100%;
    }
    .color{
        display: inline-block;
        padding: 17px;
        border-radius: 100%;
        border: 0.5px solid black;
        cursor: pointer;
    }
    .itemButton{
        width: 100%;
        border: 2px solid #123026;
        border-radius: 5px;
        background-color: #fff;
        color: #123026;
        text-align: center;
        padding: 10px 0;
        font-size: 16px;
        cursor: pointer;
    }
</style>