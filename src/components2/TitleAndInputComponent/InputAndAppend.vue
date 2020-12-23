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
      type="text"
      :maxlength="maxlength !== -1 ? maxlength : -1"
      :minlength="minlength !== -1 ? minlength : -1"
      :show-word-limit="showWordLimit"
      @keydown.tab.prevent.native="enterAction"
      @keyup.right.native="nextStepAction"
      @keyup.enter.native="enterAction"
      @blur="enterAction"
      clearable
      :style="{ width: inputWidth }"
      @change="testChange"
      @input="changeValueAction"
      @clear="clearAction"
      ><el-button slot="append" @click="appendClick" :icon="suffixTitle ? '' : suffixIcon">{{
        suffixTitle
      }}</el-button></el-input
    >
  </div>
</template>

<script>
export default {
  name: 'InputAndAppend',
  components: {},
  props: {
    size: String,
    showTitle: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    title: {
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
    },
    suffixTitle: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: 'el-icon-search'
    }
  },
  data() {
    return {
      inputContent: this.value !== undefined && this.value !== null ? this.value : ''
    }
  },
  methods: {
    appendClick() {
      this.inputContent = this.inputContent.trim()
      this.$emit('on-append-click', this.inputContent)
    },
    nextStepAction() {
      this.inputContent = this.inputContent.trim()
      this.$emit('on-next-step', this.inputContent)
    },
    enterAction() {
      // 按下enter键触发该事件
      this.$emit('on-enter-action', this.inputContent.trim(), this.tag)
    },
    testChange() {
      // 只有input框内有值并且值有改变的时候，input框失去焦点和按下enter的时候触发事件
    },
    changeValueAction(changeValue) {
      // 在input框值改变时触发
      if (changeValue !== undefined) {
        changeValue = changeValue.trim()
        this.$emit('input', changeValue.trim(), this.tag)
      }
    },
    clearAction() {
      // 在点击input框后面的清除按钮触发的事件
      console.log(this.inputContent)
      this.$emit('input', this.inputContent.trim(), this.tag)
      this.$emit('clear', this.inputContent.trim(), this.tag)
    },
    onSetValue(val, $f) {
      // 修改表单事件
      this.inputContent = val
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
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.inputContent = to
      }
    }
  }
}
</script>

<style scoped></style>
