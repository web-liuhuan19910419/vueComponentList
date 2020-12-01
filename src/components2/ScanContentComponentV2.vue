/**
 * 扫描组件
 */
<template>
  <div class="search-layout">
    <div v-if="!isFitWidthProp" :style="{'width': this.titleWidth}" style="display: flex;justify-content: flex-start; flex-direction: row;">
      <span v-if="isMustProp" class="must-flag-layout space-around-vertical-start">*</span>
      <p class="title-layout space-around-vertical-start">{{ title }}</p>
    </div>
    <div v-else>
      <span v-if="isMustProp" class="must-flag-layout">*</span>
      <p class="title-layout space-around-vertical-start"
         :class="[{'title-width-fit-layout' : isFitWidthProp}]">{{ title }}</p>
    </div>
    <el-input
      ref="scanInputLayoutId"
      class="scan-input-layout"
      autocomplete="on"
      :type="processIsNumber()"
      :readonly="isReadonly"
      :disabled="isDisabled"
      :clearable=true
      :placeholder="placeHolderProp"
      v-model="searchContent"
      :style="{'width': this.inputWidth}"
      @keyup.enter.native="searchAction"
      @keydown.tab.prevent.native="searchAction"
      @keyup.right.native="nextStep"
      @clear="setValueNull"
      />
  </div>
</template>

<script>
export default {
  name: 'ScanContentComponentV2',
  props: {
    // form-create  使用到参数value，disabled
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isMustProp: {
      type: Boolean,
      default: false
    },
    title: '',
    titleWidth: {
      type: String,
      default: '160px'
    },
    isFitWidthProp: false,
    placeHolderProp: '',
    inputWidthProp: {
      type: Number,
      default: 280
    },
    isNumberProp: false
  },
  data () {
    return {
      searchContent: '',
      inputWidth: '200px',
      isDisabled: false,
      isReadonly: false,
      immediateFlag: true
    }
  },
  created () {
    console.log(this.value)
  },
  methods: {
    searchAction () {
      console.log('searchAction')
      this.$emit('on-search', this.searchContent.trim())
      // 更新组件内部的值 form-create
      this.$emit('input', this.searchContent.trim())
    },
    setValueNull () {
      console.log('searchAction null')
      this.$emit('on-search', this.searchContent.trim())
      // 更新组件内部的值 form-create
      this.$emit('input', this.searchContent.trim())
    },
    processIsNumber () {
      return this.isNumberProp ? 'number' : 'text'
    },
    nextStep () {
      console.log('nextStep')
      this.$emit('on-next-step')
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.searchContent = (this.value !== null && this.value !== undefined) ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.searchContent = val
    }
  },
  beforeMount () {
    if (this.inputWidthProp !== undefined) {
      this.inputWidth = this.inputWidthProp + 'px'
    }
    if (this.value !== undefined) {
      this.searchContent = this.value
    }
  },
  mounted () {
    this.searchContent = (this.value === null || this.value === undefined) ? '' : this.value
    this.isDisabled = this.disabled
  },
  watch: {
    value (to, from) {
      if (to !== undefined && to !== null) {
        this.searchContent = to
      }
    },
    searchContent (to, from) {
      if (!(to === null || to === undefined)) {
        to = to.trim()
      } else {
        to = ''
      }
      this.$emit('on-search-change', to)
      // 更新组件内部的值 form-create
      this.$emit('input', to)
    },
    disabled (to, from) {
      if (to !== undefined && to !== null) {
        this.isDisabled = to
      }
    }
  }
}
</script>

<style scoped>

  .search-layout {
    display: flex;
    justify-content: flex-start;
    width:fit-content;
    width:-moz-fit-content;
    align-items: center;
  }

  .scan-input-layout {
    margin-left: 10px;
  }

  input::-webkit-input-placeholder {
    padding-left: 10px;
    color: #d0d0d0;
  }

  .title-layout {
    font-size: 14px;
    color: #484848;
    line-height: 20px;
    height: 35px;
    padding: 0px 10px 0px 0px;
    text-align: left;
  }
  .title-width-fit-layout {
    width:fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
    width:auto;
    overflow:visible;
  }

  .must-flag-layout {
    color: #E53646;
  }

</style>
