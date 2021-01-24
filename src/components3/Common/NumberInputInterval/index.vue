<template>
  <div class="main-input-more-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <t-label
      :is-fit-title-width="getIsFitTitleWidth"
      :is-must="getIsMust"
      :title="getTitle"
      :is-show-title="getIsShowTitle"
      :show-title-width="getShowTitleWidth"
      :show-title-left="getShowTitleLeft"
    ></t-label>
    <div v-if="isNumberComponent" class="input-more-layout">
      <el-input-number
        key="numberOne"
        v-model="numberOne"
        :min="getInputOneMin"
        :max="getInputOneMax"
        :style="{ width: this.getInputWidth }"
        @input="val => onInputAction(val)"
      ></el-input-number>
      <span class="input-more-cut-layout">-</span>
      <el-input-number
        key="numberTwo"
        v-model="numberTwo"
        :min="getInputTwoMin"
        :max="getInputTwoMax"
        :style="{ width: this.getInputWidth }"
        @input="val => onInputTwoAction(val)"
      ></el-input-number>
    </div>
    <div v-else class="input-more-layout">
      <el-input
        type="number"
        v-model="numberOne"
        :min="getInputOneMin"
        :max="getInputOneMax"
        :style="{ width: this.getInputWidth }"
      ></el-input>
      <span class="input-more-cut-layout">-</span>
      <el-input
        type="number"
        v-model="numberTwo"
        :min="getInputTwoMin"
        :max="getInputTwoMax"
        :style="{ width: this.getInputWidth }"
      ></el-input>
    </div>
  </div>
</template>

<script>
import TLabel from '../Label/TLabel'
export default {
  name: 'NumberInputInterval',
  components: {
    TLabel
  },
  props: {
    // 初始值
    value: {
      type: Object,
      default: () => {
        return { numberOne: '', numberTwo: '' }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示标题
    isShowTitle: {
      type: Boolean,
      default: false
    },
    showTitleLeft: {
      type: Boolean,
      default: true
    },
    showTitleWidth: {
      type: Number,
      default: 170
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    isFitTitleWidth: {
      type: Boolean,
      default: false
    },
    // 星标显示
    isMust: {
      type: Boolean,
      default: false
    },
    isNumberComponent: {
      type: Boolean,
      default: true
    },
    inputOneMax: {
      type: Number,
      default: Infinity
    },
    inputOneMin: {
      type: Number,
      default: -Infinity
    },
    inputTwoMax: {
      type: Number,
      default: Infinity
    },
    inputTwoMin: {
      type: Number,
      default: -Infinity
    },
    inputWidth: {
      type: Number,
      default: 150
    },
    tag: {
      type: Number,
      default: 0
    },
    size: String
  },
  data() {
    return { numberOne: this.value.numberOne, numberTwo: this.value.numberTwo }
  },
  methods: {
    onInputAction(val) {
      console.log('onInputAction =' + val)
      this.$emit(
        'input',
        {
          numberOne: this.numberOne,
          numberTwo: this.numberTwo
        },
        this.tag
      )
    },
    onInputTwoAction(val) {
      console.log('onInputTwoAction =' + val)
      this.$emit(
        'input',
        {
          numberOne: this.numberOne,
          numberTwo: this.numberTwo
        },
        this.tag
      )
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    getIsFitTitleWidth() {
      return this.isFitTitleWidth
    },
    getIsShowTitle() {
      return this.isShowTitle
    },
    getShowTitleLeft() {
      return this.showTitleLeft
    },
    getShowTitleWidth() {
      return this.showTitleWidth
    },
    getIsMust() {
      return this.isMust
    },
    getInputOneMax() {
      return this.inputOneMax
    },
    getInputTwoMax() {
      return this.inputTwoMax
    },
    getInputOneMin() {
      return this.inputOneMin
    },
    getInputTwoMin() {
      return this.inputTwoMin
    },
    getInputWidth() {
      return this.inputWidth + 'px'
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined && to.numberOne && to.numberTwo) {
        this.numberOne = to.numberOne
        this.numberTwo = to.numberTwo
      }
    }
  }
}
</script>

<style scoped>
.main-input-more-layout {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.input-more-layout {
  display: flex;
  align-items: center;
}
.input-more-cut-layout {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
