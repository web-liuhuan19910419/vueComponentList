<template>
  <div class="title-input-layout">
    <p
      :class="['title-layout', 'text-layout-' + currentSize]"
      :style="{ width: titleWidth }"
      v-if="showTitle"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>
      {{ title }}
    </p>
    <el-input-number
      ref="inputV2LayoutId"
      class="input-v2-layout"
      type="number"
      :min="min"
      :max="max"
      :precision="precision"
      :step="step"
      v-model="inputContent"
      @keyup.enter.native="enterAction"
      @blur="enterAction"
      @change="testChange"
      :style="{ width: inputWidth }"
      @input="changeValueAction"
    >
    </el-input-number>
  </div>
</template>
<script>
export default {
  name: 'TitleAndInputNumber',
  props: {
    size: String,
    value: {
      type: Number,
      default: 0
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    titleWidth: {
      type: String,
      default: '170px'
    },
    inputWidth: {
      type: String,
      default: '200px'
    },
    isMust: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100000
    },
    precision: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      inputContent: this.value !== undefined && this.value !== null ? this.value : 0
    }
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  mounted() {},
  methods: {
    enterAction() {
      // 按下enter键触发该事件
      this.$emit('on-enter-action', this.inputContent, this.tag)
    },
    testChange() {
      // 只有input框内有值并且值有改变的时候，input框失去焦点和按下enter的时候触发事件
    },
    changeValueAction(changeValue) {
      // 在input框值改变时触发
      if (changeValue !== undefined) {
        this.$emit('input', changeValue, this.tag)
      }
    },
    onSetValue(val, $f) {
      // 修改表单事件
      this.inputContent = val
    },
    onResetField() {
      // 重置input值
      this.inputContent = this.value !== null && this.value !== undefined ? this.value : 0
    },
    onDisabled(disabled) {
      // 设置input禁用
      this.disabled = disabled
    }
  }
}
</script>
<style lang="scss" scoped>
.title-input-layout {
  display: flex;
  justify-content: flex-start;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .title-layout {
    line-height: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: left;
    white-space: nowrap;
    padding: 0 10px 0 0;
  }
  .must-flag-layout {
    color: #e53646;
  }
}
</style>
