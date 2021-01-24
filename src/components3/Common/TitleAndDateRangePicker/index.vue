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
      type="daterange"
      :placeholder="placeholder"
      :picker-options="getPickerOptions()"
      unlink-panels
      range-separator="-"
      format="yyyy-MM-dd"
      value-format="yyyyMMdd"
      :start-placeholder="this.$i18n.locale === 'cn' ? '开始日期' : 'Start Date'"
      :end-placeholder="this.$i18n.locale === 'cn' ? '结束日期' : 'End Date'"
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
      type: Array,
      default: () => {
        return []
      }
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
      optionDatePicker: this.value !== null && this.value !== undefined ? this.value : [],
      currentLang: this.$i18n.locale,
      pickerOptions: {}
    }
  },
  methods: {
    getPickerOptions() {
      if (this.currentLang === 'cn') {
        return {
          // 只能选择过去的时间或者进行中
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        }
      } else {
        return {
          // 只能选择过去的时间或者进行中
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [
            {
              text: 'Last week',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: 'Last month',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        }
      }
    },
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.optionDatePicker = this.value !== null && this.value !== undefined ? this.value : []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.optionDatePicker = val
    },
    dataChangeAction(content) {
      console.log(content)
      if (content === null || content === undefined) {
        content = ['', '']
      }
      this.$emit('input', content, this.tag)
    }
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  watch: {
    '$i18n.locale'(to, from) {
      this.currentLang = to
    }
  }
}
</script>

<style lang="scss" scoped>
.title-date-picker-layout {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .title-layout {
    text-align: left;
    white-space: nowrap;
  }
}
</style>
