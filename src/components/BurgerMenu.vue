<script>
export default {
  data() {
    return {
        navs: [
          {
            name: 'Новинки',
            url: '/'
          },
          {
            name: 'Скидки',
            url: '/'
          },
          {
            name: 'Любая погода',
            url: '/'
          },
          {
            name: 'Снег',
            url: '/'
          },
          {
            name: 'О нас',
            url: '/about'
          },
        ],
        isBurgerOpen: false,
        isWideScreen: window.innerWidth > 990,
    }
  },
  created(){
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(){
        this.isWideScreen = window.innerWidth > 990
    },
    toggleBurgerMenu(){
        this.isBurgerOpen = !this.isBurgerOpen
    }
  },
  watch: {
    isBurgerOpen(newValue) {
        if (newValue) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
<template :class="{block : isBurgerOpen}">
  <div class="burgerMenu">
    <button class="burgerMenuButton" @click="toggleBurgerMenu" :class="{active : isBurgerOpen}">
      <span class="top"></span>
      <span class="mid"></span>
      <span class="bottom"></span>
    </button>
    <Transition name="animation">
      <nav v-if="isBurgerOpen">
        <ul class="headerNav__mobile">
          <li v-for="(nav, key) in navs" :key="key">
            <router-link @click="toggleBurgerMenu" :to="`${nav.url}`">{{ nav.name }}</router-link>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>
<style scoped>
    body.menu-open {
        overflow-y: hidden !important;
    }
    nav{
        width: 420px;
        height: 100%;
		background: #fff;
		position: fixed;
		top: 100px;
		left: 0;
		z-index: 99;
        padding: 50px 0;
    }
    .burgerMenuButton{
        display: block;
        width: 50px;
        height: 50px;
        background: white;
        border: none;
        position: relative;
        z-index: 100;
        appearance: none;
        cursor: pointer;
        outline: none;
    }
    span {
        display: block;
        width: 20px;
        height: 2px;
        margin: auto;
        background: #123026;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        transition: all .4s ease;

        &.top {
            transform: translateY(-8px);
        }

        &.bottom {
            transform: translateY(8px);
        }
    }
    .active{
        .top {
            transform: rotate(-45deg);
        }
        .mid{
            transform: translateX(-20px) rotate(360deg);
            opacity: 0;
        }
        .bottom {
            transform: rotate(45deg);
        }
    }
    .headerNav__mobile{
        list-style:none;
    }
    .headerNav__mobile li a{
        display: flex;
        color: #123026;
        text-decoration: none;
        padding: 15px 50px;
        font-size: 18px;
    }
    .animation-enter-from,
    .animation-leave-to{
        transform: translateX(-200px);
        opacity: 0;
    }
    .animation-enter-active{
        transition: all .3s ease;
    }
    .animation-leave-active{
        transition: all .3s ease;
    }
</style>