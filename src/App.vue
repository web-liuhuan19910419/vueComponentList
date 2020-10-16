<template>
  <div id="app">
    <header-component></header-component>
    <left-menu-component></left-menu-component>
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
  }
}
</script>

<style>
#app {
  width: 100%;
}
</style>
