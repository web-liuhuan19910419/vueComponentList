<template>
  <div class="box">
    <i :class="styles"></i>
    <input type="text" :placeholder="placeholderInfo">
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    placeholderInfo: {
      type: String,
      defualt: '请输入内容'
    },
    icon: { // 前后小图标
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    styles: {
      get () {
        return ['base-icon', this.icon]
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
   .box {
     width: 200px;
     position: relative;
   }
   .base-icon {
     position: absolute;
     top: 6px;
   }
    .left{
     left: 0px!important;
   }
   .right{
     right: 0px!important;
   }
   input {
     box-sizing: border-box;
     outline: 0;
     width: 200px;
     height: 30px;
     border: 1px solid #dcdfe6;
     border-radius: 5px;
   }
   input:hover {
     border-color:#409eff;
   }
   input:active {
     border-color:#409eff;
   }
   ::-webkit-input-placeholder {
    color: #dcdfe6;
    font-size: 12px;
   }
</style>