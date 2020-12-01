<template>
  <div>
    <div class="li-layout" v-for="(customItem, index) in customItemArray" :key=index>
      <div class="sub-item-layout">
        <title-and-input-component-v2
          :titleProp="$t(itemNameProp) + (index + 1).toString()"
          title-width-prop="60px"
          :maxlength-prop="maxlength"
          :minlength-prop="minlength"
          :tag=index
          :value='configItemContent(index)'
          :show-word-limit="showWordLimit"
          @on-input-content-change="inputContentChange"
        >
        </title-and-input-component-v2>
        <i v-if="index >= initItemCountProp" class="el-icon-remove-outline el-icon-remove-outline-layout" @click="delClick(index)"></i>
      </div>
    </div>
    <i v-if="!hideAddFlag" class="el-icon-circle-plus-outline el-icon-circle-plus-outline-layout" @click="addClick"></i>
  </div>
</template>

<script>
  import TitleAndInputComponentV2 from '@/components2/TitleAndInputComponentV2'
  export default {
    name: 'TitleAndInputLoopComponentV2',
    components: {
      TitleAndInputComponentV2
    },
    /**
     * 如果在template中，显示的调用了 prop 属性，那么 default 属性就不会生效
     * 如果在template中，不调用 prop 属性，default 就会生效
     * default 值有效与否，和 prop 的验证通不通过，没有关系
     */
    props: {
      // form-create  使用到参数value，disabled
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      itemNameProp: {
        type: String,
        default: () => {
          if (window.vm.$i18n.locale === 'en') {
            return 'Item'
          } else {
            return '项目'
          }
        }
      },
      initItemCountProp: {
        type: Number,
        default: 3
      },
      minlength: {
        type: Number,
        default: -1
      },
      maxlength: {
        type: Number,
        default: 32
      },
      maxItemSize: {
        type: Number,
        default: 20
      },
      showWordLimit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentLang: 'cn',
        customItemArray: [],
        hideAddFlag: false
      }
    },
    mounted () {
      this.currentLang = window.vm.$i18n.locale
      this.customItemArray = this.initData()
      if (this.customItemArray.length === this.maxItemSize) {
        this.hideAddFlag = true
      } else {
        this.hideAddFlag = false
      }

      // 更新组件内部的值 form-create
      this.$emit('input', this.customItemArray)
    },
    methods: {
      initData () {
        if ((this.value !== null && this.value !== undefined) && Array.isArray(this.value)) {
          return this.value
        } else {
          let itemArray = []
          for (let index = 0; index < this.initItemCountProp; index++) {
            itemArray.push({value: ''})
          }
          return itemArray
        }
      },
      delClick (index) {
        if (index >= 0 && index < this.customItemArray.length) {
          this.customItemArray.splice(index, 1)
        }

        if (this.customItemArray.length < this.maxItemSize && this.hideAddFlag) {
          this.hideAddFlag = false
        }
      },
      addClick () {
        if (this.customItemArray.length < this.maxItemSize) {
          this.customItemArray.push({value: ''})
        }

        if (this.customItemArray.length >= this.maxItemSize && !this.hideAddFlag) {
          this.hideAddFlag = true
        }
      },
      configItemContent (index) {
        if (index < this.customItemArray.length) {
          console.log('value =' + this.customItemArray[index].value)
          return this.customItemArray[index].value
        } else {
          return ''
        }
      },
      inputContentChange (data) {
        if (data !== undefined && data.tag !== undefined && data.tag >= 0 && data.tag <= this.customItemArray.length) {
          this.customItemArray[data.tag].value = data.data
        }
        // 更新组件内部的值 form-create
        this.$emit('input', this.customItemArray)
      },
      // form-create
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.customItemArray = this.initData()
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.customItemArray = val
      }
    },
    watch: {
      value (n) {
        // 同步 value 的值
        this.customItemArray = n
      }
    }
  }
</script>

<style scoped>

  .li-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .sub-item-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2px;
  }

  .el-icon-remove-outline-layout {
    font-size: 20px;
    margin-left: 10px;
    color: #484848;
  }

  .el-icon-circle-plus-outline-layout {
    font-size: 20px;
    margin-left: 60px;
    color: #484848;
  }

</style>
