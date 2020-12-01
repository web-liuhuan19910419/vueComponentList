/**
 * 搜索组件
 */
<template>
  <div class="search-layout">
      <el-input
              class="search-input-layout item-margin-right-layout"
              type="processIsNumber()"
              :placeholder="$t(placeHolderProp)"
              v-model="searchContent"
              :style="{'width': this.inputWidth}"
              @keyup.enter="searchAction" />
      <el-button type="primary" @click.stop="searchAction">{{ $t(buttonNameProp) }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchComponentV2',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeHolderProp: {
      type: String,
      default: ''
    },
    buttonNameProp: {
      type: String,
      default: 'message.quickSearch.searchTitle'
    },
    inputWidthProp: {
      type: Number,
      default: 200
    },
    isNumberProp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchContent: '',
      inputWidth: '200px'
    }
  },
  methods: {
    searchAction () {
      this.searchContent = this.searchContent.trim()
      this.$emit('on-search', this.searchContent)
    },
    processIsNumber () {
      return this.isNumberProp ? 'number' : 'text'
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.searchContent = (this.value !== null && this.value !== undefined) ? this.value : []
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
  }
}
</script>

<style scoped>

  .search-layout {
    display: flex;
    justify-content: flex-start;
    width:fit-content;
    width:-moz-fit-content;
  }

  .search-input-layout {
    font-size: 14px;
    padding-left: 10px;
    outline:none;
  }

</style>
