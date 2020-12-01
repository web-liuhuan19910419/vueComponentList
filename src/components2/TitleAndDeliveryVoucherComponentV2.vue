<template>
  <div class="title-main-layout">
    <p v-if="!isFitTitleWidth" class="sub-title-layout space-around-vertical-start1" :style="{'width':`${this.titleLabelWidth}px`}">{{ $t(title) }}</p>
    <p v-else class="sub-title-layout space-around-vertical-start1" :class="[{'sub-title-fit-layout' : isFitTitleWidth}]">{{ $t(title) }}</p>
    <p v-if="contentWidth > 0 && !isClick" class="receive-content-layout space-around-vertical-start1 sub-title-click-style main-color-primary" :style="{'width':`${this.contentWidth}px`}" v-html="btnContent"  @click="clickAction(0)"></p>
    <div v-else-if="contentWidth > 0 && isClick"  class="next-content-layout">
      <p v-html="getContent.value1" :style="{'width':`${this.contentWidth}px`}"></p>
      <p v-if="isShowNextBtn" class="sub-title-click-style main-color-primary" v-html="nextBtnContent" @click="clickAction(1)"></p>
    </div>
    <p v-else-if="!isClick" class="receive-content-layout space-around-vertical-start1" v-html="btnContent"></p>
    <div v-else class="next-content-layout">
      <p v-html="getContent.value1"></p>
      <p v-if="isShowNextBtn" class="sub-title-click-style main-color-primary" v-html="nextBtnContent" @click="clickAction(1)"></p>
    </div>
  </div>
</template>

<script>
import isTheOne from '@/utils/util/isTheOne'

export default {
  name: 'TitleAndDeliveryVoucherComponentV2',
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
    btnContent: {
      type: String,
      default: ''
    },
    isShowNextBtn: {
      type: Boolean,
      default: true
    },
    nextBtnContent: {
      type: String,
      default: ''
    },
    // TODO 待测试 是否显示单号
    /* showSingleRowFlag: {
      type: Boolean,
      default: false
    }, */
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
      isClick: false,
      content: {}
    }
  },
  mounted () {
    this.isFitTitleWidth = (this.isFitTitleWidthProp !== null && this.isFitTitleWidthProp !== undefined) ? this.isFitTitleWidthProp : this.isFitTitleWidth
    this.content = (this.value !== null && this.value !== undefined) ? this.value : this.content
  },
  methods: {
    clickAction (type) {
      if (type === 0) {
        this.$emit('on-click')
      } else if (type === 1) {
        this.$emit('on-click2', this.getContent)
      }
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
    onSetClick (isClick) {
      this.isClick = isClick
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
      return this.content
     /* if (!this.showSingleRowFlag) {
        return this.content.btn_content
      } else {
        return this.ellipsis(this.content.btn_content)
      } */
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
.sub-title-click-style {
  cursor: pointer;
}

.sub-title-fit-layout {
  width:fit-content;
  width:-moz-fit-content;
  white-space:nowrap;
}

.receive-content-layout {
  font-size: 14px;
  text-align: left;
  line-height: 15px;
  min-height: 30px;
  width: fit-content;
  word-break: break-all;
}

.receive-content-color {
  color: #484848;
}
.next-content-layout {
  display: flex;
}

.space-around-vertical-start1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
