<template>
  <div class="header-layout" :style="{'height': getHeaderHeight()}">
     <div class="left">
       欢迎来到月明心清的个人博客
     </div>
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
  .left {
    float: left;
    font-weight: 700;
    color: #fff;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }
</style>
