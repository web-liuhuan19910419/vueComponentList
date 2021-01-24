<template>
  <div class="title-date-picker-layout">
    <p
      :class="['title-layout', 'text-layout-' + currentSize]"
      :style="{ width: titleWidth }"
      v-if="showTitle"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>
      {{ title }}
    </p>
    <el-date-picker
      :style="{ width: datePickerWidth }"
      class="date-picker-layout"
      v-model="optionDatePicker"
      align="right"
      type="date"
      :placeholder="placeholder"
      :picker-options="pickerOptions"
      format="yyyy-MM-dd"
      value-format="yyyyMMdd"
      @change="dataChangeAction"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePickerComponentV2',
  components: {},
  props: {
    size: String,
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: '170px'
    },
    datePickerWidth: {
      type: String,
      default: '200px'
    },
    placeholder: {
      type: String,
      default: ''
    },
    isMust: {
      type: Boolean,
      default: false
    },
    tag: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      optionDatePicker: this.value !== null && this.value !== undefined ? this.value : '',
      currentLang: this.$i18n.locale,
      pickerOptions: {
        // 只能选择过去的时间或者进行中
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    processCurrentLang() {
      let lang = ''
      if (this.$i18n.locale === 'cn') {
        lang = 'zh'
      } else if (this.$i18n.locale === 'en') {
        lang = 'en'
      }
      return lang
    },
    // form-create
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.optionDatePicker = this.value !== null && this.value !== undefined ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.optionDatePicker = val
    },
    dataChangeAction(content) {
      console.log(content)
      if (content === null || content === undefined) {
        content = ''
      }
      this.$emit('input', content, this.tag)
    }
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.title-date-picker-layout {
  display: flex;
  justify-content: flex-start;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .title-layout {
    line-height: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: left;
    white-space: nowrap;
    padding: 0 10px 0 0;
  }
}
</style>
