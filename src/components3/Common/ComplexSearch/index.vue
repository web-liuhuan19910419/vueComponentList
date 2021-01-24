<template>
  <div class="search-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <div class="search-switch-title-layout">{{ $t('message.common.search') }}</div>
    <el-input
      :placeholder="$t('message.common.pleaseInputPlaceholder')"
      v-model="showValue.searchContent"
      class="input-with-select"
      clearable
      :style="{ width: getInputWidth }"
      @keyup.enter.native="searchAction"
      @clear="clearData"
    >
      <el-select
        v-model="showValue.selectType"
        slot="prepend"
        :placeholder="$t('message.common.pleaseSelect')"
        @change="onSelectChange"
        :style="{ width: getSelectWidth }"
      >
        <el-option
          v-for="item in getOptions"
          :key="item.label"
          :label="$t(item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-input>
    <el-input
      :placeholder="$t('message.common.pleaseInputPlaceholder')"
      v-model="showValue.searchContent2"
      class="input-with-select2"
      clearable
      :style="{ width: getInputWidth }"
      @keyup.enter.native="searchAction"
      @clear="clearData2"
    >
      <el-select
        v-model="showValue.selectType2"
        slot="prepend"
        :placeholder="$t('message.common.pleaseSelect')"
        @change="onSelectChange2"
        :style="{ width: getSelectWidth }"
      >
        <el-option
          v-for="item in getOptions2"
          :key="item.label"
          :label="$t(item.label)"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-input>
    <el-button icon="el-icon-search" @click="searchAction"></el-button></div
></template>

<script>
export default {
  name: 'ComplexSearch',
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          selectType: '',
          searchContent: '',
          selectType2: '',
          searchContent2: ''
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeHolder: {
      type: String,
      default: ''
    },
    hideSearchButton: {
      type: Boolean,
      default: false
    },
    inputWidth: {
      type: String,
      default: '440px'
    },
    selectWidth: {
      type: String,
      default: '140px'
    },
    options: Array,
    options2: Array,
    size: String
  },
  data() {
    return {
      showValue:
        this.value !== undefined
          ? this.value
          : { selectType: '', searchContent: '', selectType2: '', searchContent2: '' }
    }
  },
  methods: {
    onSelectChange(content) {
      console.log('onSelectChange =' + content)
      this.$emit('on-switch-search-value', this.showValue.selectType)
    },
    onSelectChange2(content) {
      this.$emit('on-switch-search2-value', this.showValue.selectType2)
    },
    clearData() {
      console.log(this.showValue)
      this.showValue.searchContent = ''
      this.$emit('input', this.showValue)
    },
    clearData2() {
      console.log(this.showValue)
      this.showValue.searchContent2 = ''
      this.$emit('input', this.showValue)
    },
    searchAction(content) {
      console.log(this.showValue)
      this.$emit('input', this.showValue)
    },
    // form-create
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.showValue.selectType = ''
      this.showValue.searchContent = ''
      this.showValue.selectType2 = ''
      this.showValue.searchContent2 = ''
    },
    // 通过setValue
    onSetValue(val, $f) {
      this.showValue = val
    }
  },
  computed: {
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    getInputWidth() {
      return this.inputWidth
    },
    getSelectWidth() {
      return this.selectWidth
    },
    getOptions() {
      return this.options
    },
    getOptions2() {
      return this.options2
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.showValue = to
      } else {
        this.showValue = ''
      }
    }
  }
}
</script>

<style scoped>
.search-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search-switch-title-layout {
  margin-left: 5px;
  margin-right: 5px;
}

.input-with-select2 {
  margin-left: 2px;
}
</style>
