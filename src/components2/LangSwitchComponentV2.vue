<template>
  <div class="switch-lang-layout">
    <el-select v-model="langValue"  @change="langSwitch">
      <el-option
        v-for="item in cnList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <div style="diaplay: flex; align-items: center; justify-content: space-around;">
          <p style="float: left; text-align: left;">{{ item.value }}</p>
          <img :src="getUrl(item.value)"  :alt="item.value" style="width: 24px; height: 14px; vertical-align:middle; margin-left: 20px;">
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'LangSwitchComponentV2',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      cnList: [],
      langValue: 'ZH'
    }
  },
  methods: {
    langSwitch (value) {
      this.$emit('onLangSwitch', value)
    },
    getUrl (value) {
      if (value === 'ZH') {
        return require('../assets/images/zh.png')
      } else {
        return require('../assets/images/en.png')
      }
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.cnList = (this.value !== null && this.value !== undefined) ? this.value : []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.cnList = val
    }
  },
  beforeMount () {
    this.cnList = (this.value !== null && this.value !== undefined) ? this.value : []
  }
}
</script>
<style scoped>
  .switch-lang-layout >>> .el-input__inner {
    width: 65px;
    border: 0;
  }
</style>
