<template>
  <div class="button-wrap">
    <div :class="[
         size === 'medium' ? 'mediumSize' : size=== 'big' ? 'bigSize' : 'smallSize', 
         sheet === 'rectangle' ? 'rectSheet' : sheet === 'fillet' ? 'filletSheet' : sheet === 'oval' ? 'ovalSheet' : 'circleSheet',
         buttonType === 'normal' ? 'normalBgColor' : buttonType === 'primary' ? 'primaryBgColor' : buttonType === 'success' ? 'successBgColor' : buttonType === 'warning' ? 'warningBgColor' : 'dangerBgColor']">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    buttonType: { 
      type: String,
      default: 'normal' // normal success warning primary info
    },
    size: {
      type: String,
      default: 'medium' // small medium big
    },
    text: {
      type: String,
      default: ''
    },
    sheet: {
      type: String,
      default: 'rectangle' // rectangle fillet oval circle
    }
  },
  components: {},
  methods: {}
}
</script>
  
<style scoped>
  .mediumSize {
    width: 100px;
    height: 40px;
  }
  .bigSize {
    width: 200px;
    height: 60px;
  }
  .smallSize {
    width: 60px;
    height: 30px;
  }
  .rectSheet {
    border: 1px solid #dcdfe6;
  }
  .filletSheet {
    border-radius: 10px;
  }
  .ovalSheet {
    border-radius: 20px;
  }
  .circleSheet {
    border-radius: 50%;
  }
  .normalBgColor {
    background-color: white;
  }
  .primaryBgColor {
    background-color: #409eff;
  }
  .successBgColor {
    background-color: #67c23a;
  }
  .warningBgColor {
    background-color: #e6a23c;
  }
  .dangerBgColor {
    background-color: #f56c6c;
  }
</style>