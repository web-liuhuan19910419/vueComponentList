<template>
  <el-checkbox class="check-all-radio" v-model="checked" @change="checkBoxChange">{{
    this.$t('message.common.checkAll')
  }}</el-checkbox>
</template>

<script>
// 和el-table 使用建议不要使用v-model,如果用，会引起整个页面刷新 this.$t('message.common.checkAll')
export default {
  name: 'SelectCheckAll',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: this.value !== undefined && this.value !== null ? this.value : false
    }
  },
  methods: {
    checkBoxChange(content) {
      this.$emit('input', content)
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.checked = val
    },
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.checked = to
      }
    }
  }
}
</script>

<style scoped>
/*.check-all-layout {*/
/*  width: 110px;*/
/*  height: 45px;*/
/*}*/

.check-all-radio {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
