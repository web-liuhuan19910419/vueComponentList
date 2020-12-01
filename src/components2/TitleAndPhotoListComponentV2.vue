<template>
  <div class="title-main-layout">
    <p v-if="!isFitTitleWidth" class="sub-title-layout space-around-vertical-start1 main-title-value-color" :style="{'width':`${this.titleLabelWidth}px`}">{{ $t(title) }}</p>
    <p v-else class="sub-title-layout space-around-vertical-start1 main-title-value-color" :class="[{'sub-title-fit-layout' : isFitTitleWidth}]">{{ $t(title) }}</p>
    <row-show-photo-list-component-v2 style="width: calc(100% - 170px)"
    :value="getValue"></row-show-photo-list-component-v2>
  </div>
</template>

<script>
import isTheOne from '@/utils/util/isTheOne'
import RowShowPhotoListComponentV2 from '@/components2/RowShowPhotoListComponentV2'

export default {
  name: 'TitleAndPhotoListComponentV2',
  components: {
    RowShowPhotoListComponentV2
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
    }
  },
  computed: {
    getValue () {
      return this.value
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
