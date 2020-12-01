<template>
    <div class="select-input-main-layout">
      <span class="main-title-value-color align-start-vertical-row-start" :style="{width: `170px`}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{this.title}}</span>
      <div class="select-input-content-layout">
        <div class="select-input-layout">
          <div class="select-input-row-layout" v-for="(item, index) in showValue" :key="index.toString()">
            <single-select-component-v2
              title=""
              :is-show-title=false
              :options-prop="showOptions"
              :value="item.select"
              :tag="index"
              :placeholder="getSelectPlaceholder"
              @on-select-change="onSelectChange"
            >
            </single-select-component-v2>
            <title-and-number-input-component-v2
              title-prop=""
              title-width-prop="20px"
              :min-value="getMinValue"
              :max-value="getMaxValue"
              :precision="2"
              :value="item.cost"
              :tag="index"
              :placeholder="getNumberPlaceholder"
              @on-input-content-change="onNumberInputContentChange"
            >
            </title-and-number-input-component-v2>
            <i v-if="index >= minItemSize" class="el-icon-remove-outline el-icon-circle-plus-outline-layout" @click="removeClick(index)"></i>
          </div>
        </div>
        <i class="el-icon-circle-plus-outline el-icon-circle-plus-outline-layout" @click="addClick()" :style="{'margin-left': `${40+10}px`}"></i>
      </div>
    </div>
</template>

<script>
  import SingleSelectComponentV2 from '@/components2/TitleAndSingleSelectComponentV2'
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  import TitleAndInputComponentV2 from '@/components2/TitleAndInputComponentV2'
  import isTheOne from '@/utils/util/isTheOne'
  export default {
    name: 'TitleAndSelectAndNumberInputLoopComponentV2',
    components: {
      SingleSelectComponentV2,
      TitleAndNumberInputComponentV2,
      TitleAndInputComponentV2
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      options: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      minValue: {
        type: Number,
        default: -Infinity
      },
      maxValue: {
        type: Number,
        default: Infinity
      },
      minItemSize: {
        type: Number,
        default: 1
      },
      maxItemSize: {
        type: Number,
        default: 10
      },
      selectPlaceholder: {
        type: String,
        default: ''
      },
      numberPlaceholder: {
        type: String,
        default: ''
      },
      isMustProp: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showValue: (this.value !== null && this.value !== undefined) ? this.value : [],
        showOptions: !isTheOne.isUndefinedAndNull(this.options) ? this.options : [],
        hideAddFlag: false
      }
    },
    mounted () {
    },
    methods: {
      onSelectChange (content, tag) {
        if (tag >= 0 && tag < this.showValue.length) {
          this.showValue[tag].select = content
        }

        this.$emit('input', this.showValue)
      },
      onNumberInputContentChange (content) {
        if (content.tag >= 0 && content.tag < this.showValue.length) {
          this.showValue[content.tag].cost = content.data.toString()
        }

        this.$emit('input', this.showValue)
      },
      onInputContentChange (content) {
        if (content.tag >= 0 && content.tag < this.showValue.length) {
          this.showValue[content.tag].note = content.data
        }

        this.$emit('input', this.showValue)
      },
      removeClick (index) {
        this.showValue.splice(index, 1)
      },
      addClick () {
        this.showValue.push({select: '', cost: ''})
      },
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.showValue = (this.value !== null && this.value !== undefined) ? this.value : []
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.showValue = val
      },
      onSetOptions (val) {
        this.showOptions = val
      }
    },
    computed: {
      getSelectPlaceholder () {
        return this.selectPlaceholder
      },
      getNumberPlaceholder () {
        return this.numberPlaceholder
      },
      getMinValue () {
        return this.minValue
      },
      getMaxValue () {
        return this.maxValue
      }
    },
    watch: {
      value (to, from) {
        // 同步 value 的值
        if (to !== undefined && to !== null) {
          this.showValue = to
        } else {
          this.showValue = []
        }
      }
    }
  }
</script>

<style scoped>
  .select-input-row-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .select-input-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  .el-icon-circle-plus-outline-layout {
    margin-top: 6px;
    font-size: 20px;
    margin-left: 15px;
    color: #484848;
  }
  .select-input-main-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }
  .select-input-content-layout {
       display: flex;
       justify-content: flex-start;
       flex-direction: column;
     }

</style>
