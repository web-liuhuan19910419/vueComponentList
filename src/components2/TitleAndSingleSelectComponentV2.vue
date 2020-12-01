/**
 * 下拉单选组件
 */
<template>
  <div class="main-sigle-select-layout">
    <p v-if="isShowTitle && !showTitleLeft" class="title_layout_right" :style="{'width': this.showTitleWidth + 'px'}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{this.$t(this.title)}}</p>
    <p v-if="isShowTitle && showTitleLeft" class="title_layout_left" :style="{'width': this.showTitleWidth + 'px'}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{this.$t(this.title)}}</p>
    <el-select v-model="selectedValue" filterable :placeholder="$t(selectPlaceholder)" @change="selectMethod" :style="{'width':selectWidthProp}" class="single-select-layout">
        <el-option
                v-for="item in showOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
        </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'TitleAndSingleSelectComponentV2',
  props: {
    optionsProp: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectPlaceholder: {
      type: String
    },
    isLocalData: true,
    isShowTitle: {
      type: Boolean,
      default: false
    },
    showTitleLeft: {
      type: Boolean,
      default: false
    },
    showTitleWidth: {
      type: Number,
      default: 120
    },
    title: {
      type: String,
      default: ''
    },
    isMustProp: {
      type: Boolean,
      default: false
    },
    // 默认不是必须填写的,
    selectWidthProp: {
      type: String,
      default: '200px'
    },
    tag: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedValue: (this.value !== undefined && this.value !== null) ? this.value : '',
      selectLabel: '',
      showOption: (this.optionsProp !== undefined && this.optionsProp !== null) ? this.optionsProp : []
    }
  },
  methods: {
    selectMethod (value) {
      this.$emit('on-select-change', value, this.tag)
      this.$emit('input', value)
    },
    langSwitch () {
      if (this.isLocalData === false) {
        return
      }
      if (this.optionsProp !== undefined && this.optionsProp !== null) {
        this.showOption = this.optionsProp
      }
    },
    configShowOptionsFromNet () {
      this.showOption = []
      this.langSwitch()
    },
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.showOption = (this.optionsProp !== null && this.optionsProp !== undefined) ? this.optionsProp : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.showOption = val
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValueAndOptions (val, showOption) {
      this.showOption = showOption
      this.selectValue = val
    }
  },
  beforeMount () {
    if (this.value !== undefined && this.value !== null) {
      this.selectedValue = this.value.toString()
    }
    this.langSwitch()
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.value !== undefined && this.value !== null) {
        this.selectedValue = this.value
      }
    },
    value (to, from) {
      if (to !== undefined && to !== null) {
        this.selectedValue = to
      }
    },
    optionsProp (to, from) {
      if (to !== undefined && to !== null) {
        this.showOption = to
      }
    }
  }
}
</script>

<style scoped>

  .main-sigle-select-layout {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
  }

  .single-select-layout {
    width: 200px;
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

</style>
