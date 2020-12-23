/** * 下拉单选组件 */
<template>
  <div class="main-sigle-select-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <p
      v-if="isShowTitle && !showTitleLeft"
      class="title_layout_right"
      :style="{ width: this.showTitleWidth + 'px' }"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </p>
    <p
      v-if="isShowTitle && showTitleLeft"
      class="title_layout_left"
      :style="{ width: this.showTitleWidth + 'px' }"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </p>
    <el-select
      v-model="selectedValue"
      filterable
      :placeholder="selectPlaceholder"
      @change="selectMethod"
      :style="{ width: `${selectWidth}px` }"
      class="single-select-layout"
    >
      <el-option
        v-for="item in showOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <div v-if="item.custom">
          <span class="custom-select-item-icon">
            <i class="el-icon-edit"></i>
          </span>
          <span class="custom-select-item-title">{{ item.label }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'TitleAndSingleSelect',
  props: {
    // 下拉数据
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 初始值
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: String,
    //下拉默认显示
    selectPlaceholder: {
      type: String,
      default: ''
    },
    // 是否显示标题
    isShowTitle: {
      type: Boolean,
      default: false
    },
    showTitleLeft: {
      type: Boolean,
      default: true
    },
    showTitleWidth: {
      type: Number,
      default: 170
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 星标显示
    isMust: {
      type: Boolean,
      default: false
    },
    // 默认不是必须填写的,选择宽度
    selectWidth: {
      type: Number,
      default: 300
    },
    // tag标记
    tag: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedValue: this.value !== undefined && this.value !== null ? this.value : '',
      showOption: this.options !== undefined && this.options !== null ? this.options : []
    }
  },
  methods: {
    // 下拉选中改变
    selectMethod(value) {
      this.$emit('input', value, this.tag)
    },
    initOptions() {
      if (this.options !== undefined && this.options !== null) {
        this.showOption = this.options
      }
    },
    configShowOptionsFromNet() {
      this.showOption = []
      this.initOptions()
    },
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.showOption = this.options !== null && this.options !== undefined ? this.options : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.showOption = val
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValueAndOptions(val, showOption) {
      this.showOption = showOption
      this.selectedValue = val
      this.$emit('input', val, this.tag)
    }
  },
  beforeMount() {
    this.initOptions()
  },
  computed: {
    getTitle() {
      return this.title
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined && to !== null) {
        this.selectedValue = to
      } else {
        this.selectedValue = ''
      }
    },
    options(to, from) {
      if (to !== undefined && to !== null) {
        this.showOption = to
      } else {
        this.showOption = []
      }
    },
    selectWidth(to, from) {
      if (to !== undefined && to !== null) {
        this.selectWidth = to
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

$select-icon-max-width: 50px;
.main-sigle-select-layout {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.single-select-layout {
  text-align: center;
}

.title_layout_right {
  text-align: right;
  padding: 0 10px 0 0;
}
.title_layout_left {
  text-align: left;
  padding: 0 10px 0 0;
}

.single-select-layout {
  height: 100%;
  display: flex;
  align-items: center;
}

.custom-select-item-icon {
  float: left;
  max-width: $select-icon-max-width;
}

.custom-select-item-title {
  color: black;
  margin-left: 5px;
}
</style>
