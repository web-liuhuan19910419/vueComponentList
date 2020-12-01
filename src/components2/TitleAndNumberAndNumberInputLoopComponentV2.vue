<template>
    <div class="select-input-main-layout">
      <div v-if="isShowTitle" >
        <span class="main-title-value-color align-start-vertical-row-start" :style="{width: `170px`}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{this.title}}</span>
      </div>
      <div class="select-input-content-layout">
        <div v-if="subTitles.length === 3" class="sub-title-style">
          <p :style="{width: firstColsWidth, marginRight: '10px'}">{{subTitles[0]}}</p>
          <p style="width: 230px">{{subTitles[1]}}</p>
          <p style="width: 200px">{{subTitles[2]}}</p>
        </div>
        <div class="select-input-layout">
          <div class="select-input-row-layout" v-for="(item, index) in showValue" :key="index.toString()">
            <p :style="{width: firstColsWidth, color: '#484848'}">{{firstColLabels.length > index ? firstColLabels[index] : '' }}</p>
            <title-and-number-input-component-v2
              title-prop=""
              title-width-prop="0"
              :min-value="getMinValue"
              :max-value="getMaxValue"
              :precision="0"
              :value="item.cost"
              :tag="index"
              :placeholder="getNumberPlaceholder"
              @on-input-content-change="onNumberInputContentChange">
            </title-and-number-input-component-v2>
            <title-and-number-input-component-v2
              title-prop=""
              title-width-prop="20px"
              :min-value="getMinValue2"
              :max-value="getMaxValue2"
              :precision="0"
              :value="item.cost2"
              :tag="index"
              :placeholder="getNumberPlaceholder2"
              @on-input-content-change="onNumberInputContentChange2">
            </title-and-number-input-component-v2>
            <i v-if="index >= minItemSize" class="el-icon-remove-outline el-icon-circle-plus-outline-layout" @click="removeClick(index)"></i>
          </div>
        </div>
        <i v-if="showValue.length < maxItemSize" class="el-icon-circle-plus-outline el-icon-circle-plus-outline-layout" @click="addClick()" :style="{'margin-left': `${40+10}px`}"></i>
      </div>
    </div>
</template>

<script>
  import SingleSelectComponentV2 from '@/components2/TitleAndSingleSelectComponentV2'
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  import TitleAndInputComponentV2 from '@/components2/TitleAndInputComponentV2'
  export default {
    name: 'TitleAndNumberAndNumberInputLoopComponentV2',
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
      isShowTitle: {
        type: Boolean,
        default: true
      },
      subTitles: {
        type: Array,
        default: () => {
          return []
        }
      },
      firstColLabels: {
        type: Array,
        default: () => {
          return []
        }
      },
      firstColsWidth: {
        type: String,
        default: '100px'
      },
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
      minValue: {
        type: Number,
        default: -Infinity
      },
      maxValue: {
        type: Number,
        default: Infinity
      },
      minValue2: {
        type: Number,
        default: -Infinity
      },
      maxValue2: {
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
      numberPlaceholder: {
        type: String,
        default: ''
      },
      numberPlaceholder2: {
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
        hideAddFlag: false
      }
    },
    mounted () {
    },
    methods: {
      onNumberInputContentChange (content) {
        if (content.tag >= 0 && content.tag < this.showValue.length) {
          this.showValue[content.tag].cost = content.data.toString()
        }
        this.$emit('input', this.showValue)
      },
      onNumberInputContentChange2 (content) {
        if (content.tag >= 0 && content.tag < this.showValue.length) {
          this.showValue[content.tag].cost2 = content.data.toString()
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
        this.showValue.push({cost: '', cost2: ''})
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
      }
    },
    computed: {
      getNumberPlaceholder () {
        return this.numberPlaceholder
      },
      getNumberPlaceholder2 () {
        return this.numberPlaceholder2
      },
      getMinValue () {
        return this.minValue
      },
      getMaxValue () {
        return this.maxValue
      },
      getMinValue2 () {
        return this.minValue2
      },
      getMaxValue2 () {
        return this.maxValue2
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

  .sub-title-style {
    display: flex;
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
