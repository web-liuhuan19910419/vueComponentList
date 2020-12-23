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
    <el-input
      ref="inputLayoutId"
      class="input-layout"
      v-model="inputContent"
      :placeholder="placeholder"
      type="textarea"
      :maxlength="maxlength !== -1 ? maxlength : -1"
      :minlength="minlength !== -1 ? minlength : -1"
      :show-word-limit="showWordLimit"
      @keydown.tab.prevent.native="enterAction"
      @keyup.right.native="nextStepAction"
      @keyup.enter.native="enterAction"
      @blur="enterAction"
      clearable
      :autosize="{ minRows: minRows, maxRows: maxRows }"
      :style="{ width: inputWidth }"
      @change="testChange"
      @input="changeValueAction"
      @clear="clearAction"
    />
  </div>
</template>
<script>
export default {
  name: 'TitleAndTextComponent',
  props: {
    size: String,
    title: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    isMust: {
      type: Boolean,
      default: false
    },
    titleWidth: {
      type: String,
      default: '160px'
    },
    placeholder: {
      type: String,
      default: ''
    },
    minlength: {
      type: Number,
      default: -1
    },
    maxlength: {
      type: Number,
      default: -1
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputWidth: {
      type: String,
      default: '200px'
    },
    tag: {
      type: Number,
      default: -1
    },
    minRows: {
      type: Number,
      default: 2
    },
    maxRows: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      inputContent: this.value !== undefined && this.value !== null ? this.value : ''
    }
  },
  methods: {
    nextStepAction() {
      this.$emit('on-next-step')
    },
    enterAction() {
      // 按下enter键触发该事件
      this.$emit('on-enter-action', this.inputContent.trim())
    },
    testChange() {
      // 只有input框内有值并且值有改变的时候，input框失去焦点和按下enter的时候触发事件
    },
    changeValueAction(changeValue) {
      // 在input框值改变时触发
      if (changeValue !== undefined) {
        changeValue = changeValue.trim()
        this.$emit('input', this.inputContent, this.tag)
      }
    },
    clearAction() {
      // 在点击input框后面的清除按钮触发的事件
      console.log(this.inputContent)
      this.$emit('input', this.inputContent, this.tag)
      this.$emit('clear', this.inputContent, this.tag)
    },
    onSetValue(val, $f) {
      // 修改表单事件
      this.inputContent = val
      console.log(this.inputContent)
    },
    onResetField() {
      // 重置input值
      this.inputContent = this.value !== null && this.value !== undefined ? this.value : ''
    },
    onDisabled(disabled) {
      // 设置input禁用
      this.disabled = disabled
    }
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  mounted() {},
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.inputContent = to
      }
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
