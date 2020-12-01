<template>
  <!--新的单组筛选查询组件-->
  <div class="input-search-layout">
    <span class="title-layout" align="center">{{$t('message.query')}}</span>
    <el-input style="width: 450px" :placeholder="$t('message.pleaseEnterContent')" v-model="searchContent" clearable class="input-with-select"
              @keyup.enter.native="searchAction"
              @clear="clearData">
      <el-select v-model="selectOptionValue" slot="prepend" :placeholder="$t('message.pleaseSelect')" @change="onSelectChange">
        <el-option
          v-for="item in selectList"
          :key="item.name"
          :label="$t(item.name)"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
    </el-input>
  </div>
</template>

<script>
import isTheOne from '@/utils/util/isTheOne'

export default {
  name: 'TitleAndSelectAndSearchComponentV2',
  props: {
    // TODO，如果调用者不是静态数据，点击按钮每次重新初始化，这是个问题，规避动态
    value: {
      type: Object,
      default: () => {
        return {
          selectOptionProp: {
            type: String,
            default: '0'
          },
          searchContentProp: {
            type: String,
            default: ''
          },
          optionsProp: {
            type: Array,
            default: () => {
              return []
            }
          }
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectOptionValue: '0',
      searchContent: '',
      selectList: null
    }
  },
  methods: {
    initData (value) {
      if (value !== undefined && value.searchContentProp !== undefined) {
        this.searchContent = value.searchContentProp
      }

      if (value !== null && value.optionsProp !== undefined) {
        this.selectList = value.optionsProp
      }
    },
    initSelectData (value) {
      if (this.selectList.length > 0) {
        if (!isTheOne.isUndefinedAndNull(value.selectOptionProp)) {
          let flag = false
          for (let tmpI of this.selectList) {
            if (tmpI.value === value.selectOptionProp) {
              flag = true
            }
          }
          if (flag) {
            this.selectOptionValue = value.selectOptionProp
          } else {
            this.selectOptionValue = this.selectList[0].value
          }
        } else {
          this.selectOptionValue = this.selectList[0].value
        }
      } else {
        this.selectOptionValue = ''
      }
    },
    onInputContentChange (value) {
    },
    onSelectChange (value) {
      console.log('this.selectOptionValue =' + this.selectOptionValue)
      this.$emit('on-switch-search-index', this.selectOptionValue)
    },
    searchAction () {
      console.log('this.searchContent =' + this.searchContent)
      this.$emit('on-search', this.searchContent.trim(), this.selectOptionValue)
      this.$emit('input', {searchContentProp: this.searchContent.trim(), selectOptionProp: this.selectOptionValue})
    },
    clearData () {
      this.searchContent = ''
      this.$emit('on-search', this.searchContent)
      this.$emit('input', {searchContentProp: this.searchContent.trim(), selectOptionProp: this.selectOptionValue})
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.selectOptionValue = '0'
      this.searchContent = ''
      this.selectList = []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.value = val
      this.initData(this.value)
    }
  },
  beforeMount () {
    this.initData(this.value)
    this.initSelectData(this.value)
  },
  watch: {
    value (val, oldVal) {
      this.initData(val)
    }
    // searchContent (to, from) {
    //   if (to !== undefined && to === '') {
    //     this.$emit('on-search', this.searchContent, this.selectOptionValue)
    //   }
    // }
  }
}
</script>

<style scoped>
  .title-layout {
    width: 50px;
    text-align: left;
    font-size: 12px;
  }
  .input-search-layout {
    display: flex;
    justify-content: flex-start;
    text-align: center;
    font-size: 14px;
    align-items: center;
  }

  .el-input .el-select {
    width:fit-content;
    width:-moz-fit-content;
    white-space:nowrap;
    min-width: 110px;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
