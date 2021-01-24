<template>
  <div class="main-scascader-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <t-label
      :is-fit-title-width="getIsFitTitleWidth"
      :is-must="isMust"
      :title="getTitle"
      :is-show-title="isShowTitle"
      :show-title-width="showTitleWidth"
      :show-title-left="showTitleLeft"
    ></t-label>
    <el-cascader
      class="cascader-layout"
      :style="{ width: getWidth + 'px' }"
      expand-trigger="hover"
      v-bind="cascaderProps"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
import TLabel from '@/components3/Common/Label/TLabel'

export default {
  name: 'TitleAndCascader',
  components: {
    TLabel
  },
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
    isFitTitleWidth: {
      type: Boolean,
      default: false
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
    width: {
      type: Number,
      default: 400
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
    getIsFitTitleWidth() {
      return this.isFitTitleWidth
    },
    getWidth() {
      return this.width
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
.main-scascader-layout {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cascader-layout {
  min-width: 250px;
  height: 100%;
  margin-right: 10px;
}
.space-around-vertical-start1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
