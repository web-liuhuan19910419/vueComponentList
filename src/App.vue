<template>
  <div id="app">
    <header-component></header-component>
    <div class="content-layout">
      <left-menu-component></left-menu-component>
      <div class="page-layout" :style="{'height': getPageHeight()}">
        <transition name="slide">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent'
import LeftMenuComponent from './components/LeftMenuComponent'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    LeftMenuComponent
  },
  data () {
    return {
      pageContentHeight: ''
    }
  },
  methods: {
    getPageHeight () {
      console.log(this.$globalConst.getShowSideMenuHeight())
      return this.$globalConst.getShowSideMenuHeight() + 'px'
    }
  },
  beforeMount () {
  },
  mounted () {
    console.log(this.$i18n.locale)
  },
}
</script>

<style>
.slide-active,.slide-leave-active {
transition: all .2s linear;
transform: translate3D(0, 0, 0);
}
.slide-enter,.slide-leave-active {
transform: translate3D(100%, 0, 0);
}
#app {
  width: 100%;
  background-color: #f9f9f9;
}
.content-layout {
  width: 100%;
}
.page-layout {
  background-color: #ffffff;
  width: calc(100% - 310px);
  margin: 0px 5px;
  float: left;
  overflow: auto;
}
</style>
