<template>
  <div class="header-layout" :style="{'height': getHeaderHeight()}">
     我是头部组件
  </div>
</template>
<script>
  export default {
    name: 'HeaderComponent',
    props: {},
    data () {
      return {
      }
    },
    methods: {
      getHeaderHeight () {
        return this.$globalConst.headerHeight + 'px'
      }
    }
  }
</script>
<style scoped>
  .header-layout {
    width: 100%;
    background-color: #24292e;
  }
</style>
