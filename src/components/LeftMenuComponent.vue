<template>
   <div class="left-menu-layout" :style="{'width': getMenuWidth(), 'height': getMenuHeight()}">
       我是侧边栏
   </div>
</template>
<script>
  export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {}
  },
  methods: {
    getMenuWidth () {
      return this.$globalConst.sideMenuWidth + 'px'
    },
    getMenuHeight () {
      return this.$globalConst.getShowSideMenuHeight() + 'px'
    }
  }
}
</script>
<style scoped>
   .left-menu-layout {
     float: left;
   }
</style>