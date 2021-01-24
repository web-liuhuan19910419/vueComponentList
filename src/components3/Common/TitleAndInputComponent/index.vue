<template>
  <div>
    <component
      ref="inputId"
      :is="setSwitchComponent()"
      :value="value"
      :title="title"
      :isMust="isMust"
      :titleWidth="titleWidth"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :showWordLimit="showWordLimit"
      :disabled="disabled"
      :inputWidth="inputWidth"
      :tag="tag"
      :minRows="minRows"
      :maxRows="maxRows"
      :showTitle="showTitle"
      @on-next-step="onNextStepAction"
      @on-enter-action="onEnterAction"
      @input="onInputAction"
      @clear="onClearAction"
    >
    </component>
  </div>
</template>
<script>
import TitleAndTextComponent from './Components/TitleAndTextComponent'
import TitleAndTextAreaComponent from './Components/TitleAndTextAreaComponent'
export default {
  name: 'TitleAndInputComponent',
  props: {
    type: {
      type: String,
      default: 'text'
    },
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
      default: '170px'
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
  components: {
    TitleAndTextComponent,
    TitleAndTextAreaComponent
  },
  data() {
    return {}
  },
  methods: {
    setSwitchComponent() {
      // 根据传进来的type的值
      if (this.type === 'text') {
        return 'TitleAndTextComponent'
      } else {
        return 'TitleAndTextAreaComponent'
      }
    },
    onNextStepAction() {
      this.$emit('on-next-step-action')
    },
    onEnterAction(inputContent) {
      // 按下enter键触发的事件
      this.$emit('on-enter-action', inputContent)
    },
    onInputAction(inputContent, tag) {
      // input值发生改变的时候的事件
      this.$emit('input', inputContent, tag)
    },
    onClearAction(inputContent, tag) {
      // 清除按钮的时候发生的事件
      this.$emit('input', inputContent, tag)
      this.$emit('clear', inputContent, tag)
    },
    onWrestFocus() {
      // 抢夺光标事件
      this.$refs.inputId.$refs.inputLayoutId.focus()
    },
    onLostFocus() {
      // 失去光标事件
      this.$refs.inputId.$refs.inputLayoutId.blur()
    },
    onDisabled(disabled) {
      // 设置input禁用
      this.$refs.inputId.onDisabled(disabled)
    },
    onResetField() {
      // 重置input值
      this.$refs.inputId.onResetField()
    },
    onSetValue(val, $f) {
      // 修改表单事件
      this.$refs.inputId.onSetValue(val, $f)
    }
  },
  computed: {},
  mounted() {
    console.log(this.$refs.inputId.$refs.inputLayoutId)
  },
  watch: {
    value(to, from) {
      console.log(to, from)
    }
  }
}
</script>
<style></style>
