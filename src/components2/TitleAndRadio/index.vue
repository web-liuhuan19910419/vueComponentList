<template>
  <div class="radio-layout">
    <p
      :class="['title-layout', 'text-layout-' + currentSize]"
      :style="{ width: titleWidth }"
      v-if="showTitle"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>
      {{ title }}
    </p>
    <el-radio-group v-model="radioValue" @change="onRadioChange" v-if="styleType === 'radio'">
      <el-radio
        v-for="item of radioOptions"
        :label="item.label"
        :key="item.name"
        :disabled="item.disabled === undefined ? false : item.disabled"
        >{{ item.name.indexOf('message.') === -1 ? item.name : $t(item.name) }}</el-radio
      >
    </el-radio-group>
    <el-radio-group v-model="radioValue" @change="onRadioChange" v-else>
      <el-radio-button
        v-for="item of radioOptions"
        :label="item.label"
        :key="item.name"
        :disabled="item.disabled === undefined ? false : item.disabled"
        >{{ item.name.indexOf('message.') === -1 ? item.name : $t(item.name) }}</el-radio-button
      >
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: 'TitleAndRadio',
  props: {
    size: String,
    styleType: {
      // 样式选择  radio是原形的   button是方形按钮的形式
      type: String,
      default: 'radio'
    },
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isMust: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: '170px'
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    tag: {
      type: Number,
      default: -1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radioValue: this.value !== null && this.value !== undefined ? this.value : '',
      radioOptions: this.options !== null && this.options !== undefined ? this.options : []
    }
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  mounted() {
    console.log(this.radioValue)
    console.log(this.radioOptions)
  },
  methods: {
    onRadioChange(value) {
      console.log(value)
      this.$emit('input', value)
    },
    onSetValue(val, $f) {
      // 修改表单事件
      this.radioValue = val
    },
    onResetField() {
      // 重置input值
      this.radioValue = this.value !== null && this.value !== undefined ? this.value : ''
    },
    onDisabled(disabled) {
      // 设置input禁用
      this.disabled = disabled
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.radioValue = to
      }
    },
    options: {
      handler: function(to, from) {
        console.log('执行监听函数')
        if (to !== undefined) {
          this.radioOptions = to
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-layout {
  display: flex;
  align-items: center;
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
