<template>
<!--自己封装的下拉选择组件-->
  <div>
     <div @click="trigger" class="box">
        <i :class="['base-icon', !selectListFlag? 'icon iconfont icon-xialajiantou' : 'icon iconfont icon-xiangshangjiantou']"></i>
        <div ref="inputDom" class="input-dom">{{selectText}}</div>
     </div>
     <ul :class="['trigger-list-layout', !selectListFlag ? 'hide' : 'show']" ref="optionDom">
       <li v-for="(list) of options" :key="list.name" @click="select(list)" :class="['base-list-style', list.checked === '0' ? 'base-list-style' : list.checked === '1' ? 'checked-list-style' : 'disabled-list-style']" >
         {{list.name}}
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  name: 'MySelectComponent',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }  
  },
  data () {
    return {
      selectText: '', // 选中的label值
      selectValue: this.value.length !== 0 ? this.value : '', // input框自己选中
      selectListFlag: false, // 控制下拉选项的显示与否
      selectOptions: this.options.length > 0 ? this.options : []
    }
  },
  methods: {
    trigger () { // 点击input框，出现下拉按钮
      this.selectListFlag = !this.selectListFlag
      console.log(this.selectListFlag)
    },
    select (list) { // 点击下拉组件
      if (list.checked === '2') {
        return
      }
      for (let index = 0; index < this.selectOptions.length; index++) {
        let element = this.selectOptions[index]
        if (element.checked !== '2') {
          if (list.value !== element.value) {
            element.checked = '0'
          } else {
            element.checked = '1'
          }
        }
      }
      console.log(this.selectOptions)
      console.log(list)
      this.selectText = list.name
      this.selectValue = list.value
      this.selectListFlag = !this.selectListFlag
      this.$emit('input', this.selectValue)
    }
  },
  mounted () {
    this.selectOptions.forEach((item) => {
      if (item.checked === '1') {
        this.selectText = item.name
        this.selectValue = item.value
      }
    })
  },
  computed: {
    // optionListStyles: {
    //   get () {
    //     return  ['trigger-list-layout', !this.selectListFlag? 'hide' : 'show']
    //   }
    // }
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
    right: 5px;
  }
  .input-dom {
    box-sizing: border-box;
    outline: 0;
    width: 200px;
    height: 30px;
    line-height: 30px;
    padding-left: 20px!important;
    text-align: left;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
   }
   .input-dom:hover {
    border-color:#409eff;
    cursor: pointer;
   }
   .input-dom:active {
    border-color:#409eff;
   }
   .trigger-list-layout {
     width: 200px;
     border: 1px solid #e4e7ed;
     border-radius: 4px;
     background-color: #fff;
     box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
     box-sizing: border-box;
     margin: 5px 0;
     transition: all 2s;
     height: 150px;
     overflow: auto;
   }
   .hide {
     display: none;
   }
   .show {
     display: block;
   }
   .base-list-style {
     text-align: left;
     height: 34px;
     padding: 0 20px;
     line-height: 34px;
     cursor: pointer;
   }
   .base-list-style:hover {
     background-color:#DCDCDC;
   }
   .checked-list-style {
     color: #3a8ee6;
   }
   .disabled-list-style {
    cursor: not-allowed;
    color: #DCDCDC;
   }
   .disabled-list-style:hover {
     background-color: white!important;
   }
</style>