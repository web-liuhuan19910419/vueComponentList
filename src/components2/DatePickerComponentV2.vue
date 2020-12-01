<template>
  <div class="date-picker-layout">
    <el-date-picker
            v-model="optionDatePicker"
            align="right"
            type="date"
            :placeholder="this.$t('message.selectDate')"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyyMMdd"
            @change="dataChangeAction">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePickerComponentV2',
  components: {
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      optionDatePicker: (this.value !== null && this.value !== undefined) ? this.value : '',
      currentLang: this.$i18n.locale,
      pickerOptions: {
        // 只能选择过去的时间或者进行中
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    processCurrentLang () {
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
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.optionDatePicker = (this.value !== null && this.value !== undefined) ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.optionDatePicker = val
    },
    dataChangeAction (content) {
      console.log(content)
      if (content === null || content === undefined) {
        content = ''
      }
      this.$emit('on-option', content)
    }
  },
  watch: {
  }
}
</script>

<style scoped>

.date-picker-layout {
  margin-left: 10px;
  margin-top: 0px;
}

</style>
