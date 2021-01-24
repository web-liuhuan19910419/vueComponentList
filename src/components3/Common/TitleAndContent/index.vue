<template>
  <div class="title-main-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <!-- 标题 -->
    <div
      v-if="!getIsFitTitleWidth"
      class="sub-title-layout space-around-vertical-start1"
      :style="{
        width: `${this.titleLabelWidth}px`
      }"
    >
      {{ getTitle }}
    </div>
    <div
      v-else
      class="sub-title-layout space-around-vertical-start1"
      :class="[{ 'sub-title-fit-layout': getIsFitTitleWidth }]"
    >
      {{ getTitle }}
    </div>
    <!-- 内容 -->
    <div
      v-if="contentWidth > 0 && !isClick"
      class="receive-content-layout space-around-vertical-start1"
      :style="{ width: `${this.contentWidth}px` }"
      v-html="getContent"
    ></div>
    <div
      v-else-if="contentWidth > 0 && isClick"
      class="receive-content-layout space-around-vertical-start1"
      :style="{ width: `${this.contentWidth}px` }"
      v-html="getContent"
      @click="clickAction(content)"
    ></div>
    <div
      v-else-if="!isClick"
      class="receive-content-layout space-around-vertical-start1"
      v-html="getContent"
    ></div>
    <div
      v-else
      class="receive-content-layout space-around-vertical-start1"
      v-html="getContent"
      @click="clickAction(content)"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'TitleAndContent',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    titleLabelWidth: {
      type: String,
      default: '160'
    },
    isFitTitleWidth: {
      type: Boolean,
      default: false
    },
    contentWidth: {
      type: Number,
      default: 0
    },
    isClick: {
      type: Boolean,
      default: false
    },
    // TODO 待测试 是否显示单号
    showSingleRowFlag: {
      type: Boolean,
      default: false
    },
    singleRowMaxChar: {
      type: Number,
      default: 40
    },
    tag: {
      type: Number,
      default: 0
    },
    size: String
  },
  methods: {
    clickAction(data) {
      this.$emit('input', data, this.tag)
    },
    // form-create
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.content = this.value !== null && this.value !== undefined ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.content = val
    },
    // 当渲染的文字超出30字后显示省略号
    ellipsis(value) {
      if (!value) return ''
      if (value.length > this.singleRowMaxChar) {
        return value.slice(0, this.singleRowMaxChar) + '...'
      }
      return value
    }
  },
  computed: {
    getContent() {
      if (!this.showSingleRowFlag) {
        return this.value
      } else {
        return this.ellipsis(this.value)
      }
    },
    getTitle() {
      return this.title
    },
    getIsFitTitleWidth() {
      return this.isFitTitleWidth
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.title-main-layout {
  align-items: center;
  min-height: 26px;
  line-height: 14px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  text-align: left;
}
.sub-title-layout {
  color: $wms-color-text-primary;
  text-align: left;
  word-break: break-all;
  overflow-x: hidden;
  flex-shrink: 0;
}

.sub-title-fit-layout {
  width: fit-content;
  width: -moz-fit-content;
  white-space: nowrap;
}

.receive-content-layout {
  margin-left: 10px;
  color: $wms-color-text-primary;
  text-align: left;
  width: fit-content;
  word-break: break-all;
  overflow-x: hidden;
}

.space-around-vertical-start1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
