<template>
  <!--新的单组筛选查询组件-->
  <div class="input-search-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <span class="title-layout" align="center">{{ this.getTitle }}</span>
    <el-input
      :style="{ width: `${inputWidth}px` }"
      :placeholder="this.getPleaseEnterContent"
      v-model="data.searchContent"
      clearable
      class="input-with-select"
      @keyup.enter.native="searchAction"
      @clear="clearData"
    >
      <el-select
        v-model="data.selectOption"
        slot="prepend"
        :placeholder="this.getPleaseSelect"
        @change="onSelectChange"
      >
        <el-option
          v-for="item in this.getSearchOptions"
          :key="item.label"
          :label="$t(item.label)"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'TitleAndSelectAndInputSearch',
  props: {
    title: {
      type: String,
      default: 'Query'
    },
    pleaseEnterContent: {
      type: String,
      default: ''
    },
    pleaseSelect: {
      type: String,
      default: ''
    },
    inputWidth: {
      type: Number,
      default: 450
    },
    value: {
      type: Object,
      default: () => {
        return {
          selectOption: '',
          searchContent: ''
        }
      }
    },
    searchOptions: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: String
  },
  data() {
    return {
      data:
        this.value !== undefined && this.value !== null
          ? this.value
          : {
              selectOption: '',
              searchContent: ''
            }
    }
  },
  methods: {
    initData(value) {
      this.data = value
    },
    initSelectData() {
      if (this.data.selectOption.length === 0) {
        if (this.searchOptions !== undefined && this.searchOptions.length > 0) {
          this.data.selectOption = this.searchOptions[0].value
        }
      }
    },
    onSelectChange(value) {
      this.$emit('on-select-search-index', this.data.selectOption)
    },
    searchAction() {
      this.$emit('input', {
        searchContent: this.data.searchContent.trim(),
        selectOption: this.data.selectOption
      })
    },
    clearData() {
      this.$emit('input', {
        searchContent: this.data.searchContent,
        selectOption: this.data.selectOption
      })
    },
    // form-create
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.data.selectOption = '0'
      this.data.searchContent = ''
      this.searchOptions = []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.value = val
      this.initData(this.value)
      this.initSelectData()
    }
  },
  beforeMount() {
    this.initData(this.value)
    // 兼容默认第一个选中
    this.initSelectData()
  },
  computed: {
    getTitle() {
      if (this.title !== undefined && this.title !== null && this.title.length > 0) {
        return this.title
      } else {
        return this.$t('message.common.query')
      }
    },
    getPleaseEnterContent() {
      if (
        this.pleaseEnterContent !== undefined &&
        this.pleaseEnterContent !== null &&
        this.pleaseEnterContent.length > 0
      ) {
        return this.pleaseEnterContent
      } else {
        return this.$t('message.common.pleaseInputPlaceholder')
      }
    },
    getPleaseSelect() {
      if (
        this.pleaseSelect !== undefined &&
        this.pleaseSelect !== null &&
        this.pleaseSelect.length > 0
      ) {
        return this.pleaseSelect
      } else {
        return this.$t('message.common.pleaseSelect')
      }
    },
    getSearchOptions() {
      return this.searchOptions
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  watch: {
    value(val, oldVal) {
      this.initData(val)
      this.initSelectData(val)
    }
  }
}
</script>

<style scoped>
.title-layout {
  width: 50px;
  text-align: left;
}
.input-search-layout {
  display: flex;
  justify-content: flex-start;
  text-align: center;
  align-items: center;
}

.el-input .el-select {
  width: fit-content;
  width: -moz-fit-content;
  white-space: nowrap;
  min-width: 110px;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
