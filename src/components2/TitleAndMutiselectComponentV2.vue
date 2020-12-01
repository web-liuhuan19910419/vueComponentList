<template>
  <div class="muti-select-layout">
    <p v-if='!isFitWidthProp' class="title-layout" :style="{'width': titleWidthProp}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{$t(titleProp)}}</p>
    <p v-else class="title-layout" ><span v-if="isMustProp" class="must-flag-layout">*</span>{{$t(titleProp)}}</p>
    <el-select v-model="selectedValue" :placeholder="$t('message.pleaseSelect')" @change="selectMethod" :style="{'width':selectWidthProp}">
      <el-option
        v-for="item in showOption"
        :key="item.value"
        :label="$t(item.name)"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import isTheOne from '@/utils/util/isTheOne'

export default {
  name: 'TitleAndMutiselectComponentV2',
  components: {
  },
  props: {
    // form-create  使用到参数value，disabled
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    optionsProp: {
      type: Array,
      default: () => {
        return []
      }
    },
    titleProp: {
      type: String,
      default: ''
    },
    selectPlaceholder: {
      type: String
    },
    isLocalData: true,
    isMustProp: {
      type: Boolean,
      default: false
    },
    // 默认不是必须填写的,
    selectWidthProp: {
      type: String,
      default: '200px'
    },
    isFitWidthProp: {
      type: Boolean,
      default: false
    },
    titleWidthProp: {
      type: String,
      default: '70px'
    }
  },
  data () {
    return {
      selectedValue: isTheOne.isUndefinedAndNull(this.value) ? '' : this.value,
      selectLabel: '',
      showOption: []
    }
  },
  methods: {
    selectMethod (value) {
      this.selectedValue = value
      this.$emit('on-select-change', this.selectedValue)
      // 更新组件内部的值 form-create
      this.$emit('input', this.selectedValue)
    },
    langSwitch () {
      if (this.optionsProp !== undefined) {
        this.showOption = []
        for (let index = 0; index < this.optionsProp.length; index++) {
          let element = this.optionsProp[index]
          let tmpItem = {}
          if (element.name.indexOf('message.') === -1) {
            tmpItem['name'] = element.name
          } else {
            tmpItem['name'] = this.$t(element.name)
          }
          if (element.value === undefined || element.value === null) {
            tmpItem['value'] = index.toString()
          } else {
            tmpItem['value'] = element.value
          }

          this.showOption.push(tmpItem)
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
      this.selectedValue = ''
      this.selectLabel = ''
      this.showOption = []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.value = val
      this.langSwitch()
    },
    onSetOptionsProp (val) {
      this.optionsProp = val
      this.langSwitch()
    }
  },
  beforeMount () {
    this.langSwitch()
    if (this.value !== undefined) {
      this.selectedValue = this.value
    }
  },
  watch: {
    value (to, from) {
      if (!isTheOne.isUndefinedAndNull(to)) {
        this.langSwitch()
        this.selectedValue = this.value.toString()
      } else {
        this.selectedValue = ''
      }
    },
    optionsProp (to, from) {
      if (!isTheOne.isUndefinedAndNull(to)) {
        this.langSwitch()
      } else {
        this.optionsProp = []
        this.langSwitch()
      }
    }
  }
}
</script>

<style scoped>
  .muti-select-layout {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .title-layout {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    white-space:nowrap;
    padding: 0px 10px 0px 0px;
  }
  .title-width-fit-layout {
    width:fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
    width:auto;
    overflow:visible;
  }
  .must-flag-layout {
    color: #E53646;
  }
</style>
