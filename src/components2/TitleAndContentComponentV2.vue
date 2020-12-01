<template>
  <div class="title-main-layout">
    <p v-if="!isFitTitleWidth" class="sub-title-layout space-around-vertical-start1" :style="{'width':`${this.titleLabelWidth}px`}">{{ $t(title) }}</p>
    <p v-else class="sub-title-layout space-around-vertical-start1" style="margin-right: 10px" :class="[{'sub-title-fit-layout' : isFitTitleWidth}]">{{ $t(title) }}</p>
    <p v-if="contentWidth > 0 && !isClick" class="receive-content-layout space-around-vertical-start1" :style="{'width':`${this.contentWidth}px`}" v-html="getContent"></p>
    <p v-else-if="contentWidth > 0 && isClick" class="receive-content-layout space-around-vertical-start1" :style="{'width':`${this.contentWidth}px`}" v-html="getContent" @click="clickAction(content)"></p>
    <p v-else-if="!isClick" class="receive-content-layout space-around-vertical-start1" v-html="getContent"></p>
    <p v-else class="receive-content-layout space-around-vertical-start1" v-html="getContent" @click="clickAction(content)"></p>
  </div>
</template>

<script>
import isTheOne from '@/utils/util/isTheOne'

export default {
  name: 'TitleAndContentComponentV2',
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
    isFitTitleWidthProp: {
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
    }
  },
  data () {
    return {
      isFitTitleWidth: false,
      content: ''
    }
  },
  mounted () {
    this.isFitTitleWidth = (this.isFitTitleWidthProp !== null && this.isFitTitleWidthProp !== undefined) ? this.isFitTitleWidthProp : this.isFitTitleWidth
    this.content = (this.value !== null && this.value !== undefined) ? this.value : this.content
  },
  methods: {
    clickAction (data) {
      this.$emit('on-content-click', {tag: this.tag, data: data})
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.content = (this.value !== null && this.value !== undefined) ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.content = val
    },
    // 当渲染的文字超出30字后显示省略号
    ellipsis (value) {
      if (!value) return ''
      if (value.length > this.singleRowMaxChar) {
        return value.slice(0, this.singleRowMaxChar) + '...'
      }
      return value
    }
  },
  computed: {
    getContent () {
      if (!this.showSingleRowFlag) {
        return this.content
      } else {
        return this.ellipsis(this.content)
      }
    }
  },
  watch: {
    value (to, from) {
      if (!isTheOne.isUndefinedAndNull(to)) {
        this.content = to
      }
    }
  }
}
</script>

<style scoped>
.title-main-layout {
  min-height: 30px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  text-align: left;
  padding: 10px 0 0 0;
}
.sub-title-layout {
  font-size: 14px;
  color: #484848;
  line-height: 15px;
  max-height: 30px;
  text-align: left;
  overflow: visible;
  margin: 0px 0px;
  word-break: break-all;
}

.sub-title-fit-layout {
  width:fit-content;
  width:-moz-fit-content;
  white-space:nowrap;
}

.receive-content-layout {
  font-size: 14px;
  color: #484848;
  text-align: left;
  line-height: 15px;
  min-height: 30px;
  width: fit-content;
  word-break: break-all;
}

.space-around-vertical-start1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
