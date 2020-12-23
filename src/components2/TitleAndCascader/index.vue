<template>
  <div class="main-select-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
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
    <el-cascader
      expand-trigger="hover"
      v-bind="cascaderProps"
      class="cascader-layout"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  name: 'TitleAndCascader',
  props: {
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
    // 初始值
    value: {},
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    //默认显示
    placeholder: {
      type: String,
      default: ''
    },
    showAllLevels: { type: Boolean, default: true },
    collapseTags: { type: Boolean, default: false },
    separator: { type: String, default: '/' },
    filterable: { type: Boolean, default: false },
    filterMethod: Function,
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => () => {}
    },
    popperClass: String,
    props: Object,
    size: String
  },
  data() {
    return {}
  },
  methods: {
    handleChange(content) {
      // ['zujian', 'form', 'radio']  单选
      // [['zujian', 'form', 'checkbox']] 多选
      this.$emit('input', content)
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    cascaderProps() {
      return {
        value: this.value,
        options: this.options,
        disabled: this.disabled,
        placeholder: this.placeholder,
        showAllLevels: this.showAllLevels,
        collapseTags: this.collapseTags,
        separator: this.separator,
        filterable: this.filterable,
        filterMethod: this.filterMethod,
        debounce: this.debounce,
        beforeFilter: this.beforeFilter,
        popperClass: this.popperClass,
        props: this.props,
        clearable: true
      }
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  }
}
</script>

<style lang="scss" scoped>
.main-select-layout {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.title_layout_right {
  text-align: right;
  padding: 0 10px 0 0;
}
.title_layout_left {
  text-align: left;
  padding: 0 10px 0 0;
}
.cascader-layout {
  min-width: 250px;
  width: 100%;
}
</style>
