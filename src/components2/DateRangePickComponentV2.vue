<template>
  <div class="date-picker-layout space-around-vertical">
    <el-date-picker style="width: 230px;"
                    v-model="optionDatePicker"
                    align="right"
                    type="daterange"
                    :picker-options="getPickerOptions()"
                    format="yyyy-MM-dd"
                    value-format="yyyyMMdd"
                    unlink-panels
                    range-separator="-"
                    :start-placeholder="this.$i18n.locale === 'cn' ? '开始日期' : 'Start Date'"
                    :end-placeholder="this.$i18n.locale === 'cn' ? '结束日期' : 'End Date'"
                    @change="dataChangeAction"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DateRangePickComponentV2',
  components: {
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      optionDatePicker: (this.value !== null && this.value !== undefined) ? this.value : [],
      currentLang: this.$i18n.locale,
      pickerOptions: {
      }
    }
  },
  methods: {
    getPickerOptions () {
      if (this.currentLang === 'cn') {
        return {
          // 只能选择过去的时间或者进行中
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
            // , {
            //   text: '最近三个月',
            //   onClick (picker) {
            //     const end = new Date()
            //     const start = new Date()
            //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            //     picker.$emit('pick', [start, end])
            //   }
            // }
          ]
        }
      } else {
        return {
          // 只能选择过去的时间或者进行中
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: 'Last week',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last month',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
          // , {
          //   text: 'Last three months',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          //     picker.$emit('pick', [start, end])
          //   }
          // }
          ]
        }
      }
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.optionDatePicker = (this.value !== null && this.value !== undefined) ? this.value : []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.optionDatePicker = val
    },
    dataChangeAction (content) {
      console.log(content)
      if (content === null || content === undefined) {
        content = ['', '']
      }
      this.$emit('on-option', content)
    }
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.currentLang = to
    }
  }
}
</script>

<style scoped>

.date-picker-layout {
  margin-left: 10px;
}

</style>
