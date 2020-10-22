<template>
  <div id="app">
    <header-component></header-component>
    <div class="content-layout">
      <left-menu-component></left-menu-component>
      <div class="page-layout" :style="{'min-height': getPageHeight()}">
        <router-view></router-view>
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
      return this.$globalConst.getShowSideMenuHeight() + 'px'
    }
  },
  beforeMount () {
  }
}
</script>

<style scoped>
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
}
</style>
