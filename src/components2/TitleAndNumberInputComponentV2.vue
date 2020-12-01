<template>
  <div class="title-input-layout">
    <p v-if='!isFitWidthProp' class="title-layout" :style="{'width': titleWidthProp}"> <span v-if="isMustProp" class="must-flag-layout">*</span> {{ $t(titleProp) }}</p>
    <p v-else class="title-layout title-width-fit-layout"> <span v-if="isMustProp" class="must-flag-layout">*</span> {{ $t(titleProp) }}</p>
    <el-input-number
      class="scan-input-layout"
      :min="minValue"
      :max="maxValue"
      :step="step"
      :precision="precision"
      v-model="inputContent"
      :style="{'width':inputWidthProp}" @input="e => inputContentChange(e)"/>
  </div>
</template>

<script>
export default {
  name: 'TitleAndNumberInputComponentV2',
  props: {
    titleProp: {
      type: String,
      default: ''
    },
    titleWidthProp: {
      type: String,
      default: '160px'
    },
    inputWidthProp: {
      type: String,
      default: '200px'
    },
    isMustProp: {
      type: Boolean,
      default: false
    },
    isFitWidthProp: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: Number,
      default: -1
    },
    minValue: {
      type: Number,
      default: -Infinity
    },
    maxValue: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      inputContent: (this.value !== undefined && this.value !== null) ? this.value : ''
    }
  },
  methods: {
    inputContentChange (content) {
      console.log('inputContentChange =' + content)
      if ((content !== undefined) && (!Number.isNaN(content))) {
        this.$emit('on-input-content-change', {tag: this.tag, data: content.toString()})
        this.$emit('input', content.toString())
      }
    },
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.inputContent = (this.value !== null && this.value !== undefined) ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.inputContent = val
    }
  },
  watch: {
    value (to, from) {
      if (to !== undefined) {
        this.inputContent = to
      } else {
        this.inputContent = ''
      }
    }
  }
}
</script>

<style scoped>
  .title-input-layout {
    display: flex;
    justify-content: flex-start;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .title-layout {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: left;
    white-space:nowrap;
  }

  .title-width-fit-layout {
    width:fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
    width:auto;
    overflow:visible;
  }

  .scan-input-layout {
    margin-left: 10px;
  }

  .must-flag-layout {
    color: #E53646;
  }

</style>
