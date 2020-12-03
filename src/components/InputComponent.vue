<template>
  <div class="box">
    <i :class="styles" @click="clickIcon"></i>
    <input ref="inputDom" type="number" :placeholder="placeholderInfo" v-model="value" autofocus="autofocus" @input="inputEvent"/>
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
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    styles: {
      get () {
        return ['base-icon', !this.clearable ? this.icon : this.value.length > 0 ? 'right icon iconfont icon-shanchu' : '']
      }
    }
  },
  methods: {
    clickIcon () {
      if (this.clearable === true) {
        this.value = '' // 清除内容
        // 重新获取焦点
        this.$refs.inputDom.focus()
        this.$emit('input', this.value)
      }
    },
    inputEvent (){
      console.log('表内的值发生了变化')
      this.$emit('input', this.value)
    }
  },
  watch: {
  },
  mounted () {
  }
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
   .base-icon:hover {
     cursor: pointer;
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
   input:focus {
	   border-color:#409eff;
   }

</style>