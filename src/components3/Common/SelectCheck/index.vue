<template>
  <div class="check-all-radio-contanier">
    <el-checkbox class="check-all-radio" v-model="checked" @change="checkBoxChange">{{
      this.getTitle(0)
    }}</el-checkbox>
    <div
      v-if="!showTitleInline"
      class="custom-check-text"
      @click="
        e => {
          this.clickTitle(e)
        }
      "
    >
      {{ this.getTitle(1) }}
    </div>
  </div>
</template>

<script>
// 和el-table 使用建议不要使用v-model,如果用，会引起整个页面刷新 this.$t('message.common.checkAll')
export default {
  name: 'SelectCheck',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showTitleInline: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      checked: this.value !== undefined && this.value !== null ? this.value : false
    }
  },
  methods: {
    checkBoxChange(content) {
      this.$emit('input', this.checked)
    },
    clickTitle(e) {
      this.$emit('click-title')
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
  computed: {
    getTitle() {
      return function(flag) {
        if (flag === 0) {
          if (this.showTitleInline) {
            return this.title ? this.title : this.$t('message.common.checkAll')
          } else {
            return ''
          }
        } else {
          return this.title ? this.title : this.$t('message.common.checkAll')
        }
      }
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

<style lang="scss" scoped>
@import '~@/styles/element-variables.scss';
.check-all-radio-contanier {
  height: 28px;
  align-items: center;
  display: flex;
}
.check-all-radio {
  margin-left: 5px;
  margin-right: 5px;
}
.custom-check-text {
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  color: $--color-primary;
  cursor: pointer;
}
</style>
