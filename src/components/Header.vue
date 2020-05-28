<template>
  <header class="header">
    <div class="inner">
      <div class="header__bar">
        <h1><nuxt-link to="/" class="header__ttl">PortFolio</nuxt-link></h1>
        <button v-on:click="toggle()" class="header__toggle btn--grey">MENU</button>
      </div>
      <nav class="gnav" v-bind:class="{ active: isActive }">
        <ul class="gnav__list">
          <li class="gnav__list-item" v-on:click="close()">
            <nuxt-link class="gnav__list-link" v-scroll-to="'/'" to>Home</nuxt-link>
          </li>
          <li class="gnav__list-item" v-on:click="close()">
            <nuxt-link class="gnav__list-link" v-scroll-to="'#about'" to>About</nuxt-link>
          </li>
          <li class="gnav__list-item" v-on:click="close()">
            <nuxt-link class="gnav__list-link" v-scroll-to="'#works'" to>Works</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    // data: function() {}
    return {
      isActive: false,
      windowWidth: 0,
    }
  },
  mounted() { //Life cycle
    window.addEventListener('resize', this.calculateWindowWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateWindowWidth)
  },
  methods: {
    toggle() {
      // toggle: function() {}
      this.isActive = !this.isActive
    },
    close() {
      this.isActive = false
    },
    calculateWindowWidth() {
      this.windowWidth = window.innerWidth
      console.log(this.windowWidth)
   },
   pagetop: function() {
     console.log(iiii)
   }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/main';
.header {
  // background: rgba(255, 255, 255, 1);
  background: #333;
  font-family: 'Poppins', sans-serif;
  padding: 15px;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  @include mq(tab) {
    // background: yellow;
  }
  @include mq(pc) {
    // background: greenyellow;
    position: relative;
  }
  .inner {
    @include mq(pc) {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
  }
  &__toggle {
    @include mq(pc) {
      display: none;
    }
  }
  &__bar {
    display: flex;
    justify-content: center;
  }
  &__ttl {
    color: #fff;
    font-size: 25px;
    margin: 0 30px;
  }
}
.gnav {
  height: 0;
  overflow: hidden;
  transition: all .3s;
  @include mq(pc) {
    height: auto;
  }
  &__list {
    margin: 45px 0 0;
    text-align: center;
    @include mq(pc) {
      display: flex;
      margin: 0;
    }
    &-item {
      margin: 50px 0;
      @include mq(pc) {
        margin: 0 15px;
      }
    }
    &-link {
      color: #fff;
      font-size: 25px;
    }
  }
  &.active {
    height: 100vh;
    transition: all .3s;
  }
}
</style>
