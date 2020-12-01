<template>
    <div>
      <span class="main-title-value-color">{{this.title}}</span>
      <div>
        <div v-for="(item, index) in showValue" :key="index.toString()" class="show-list-layout">
          <p class="item-show-title-layout" v-html="item.title"></p>
          <el-radio v-model="item.radio" label="1">{{getShowTitle(true)}}</el-radio>
          <el-radio v-model="item.radio" label="2">{{getShowTitle(false)}}</el-radio>
          <i v-if="item.del" class="el-icon-close red-colse-layout"></i>
        </div>
      </div>
      <div v-if="showAddFlag">
        <el-button v-if="!addFlag" type="text" @click="addFunAction(true)">{{getAddTitle(true)}}</el-button>
        <div v-else>
          <el-input class="input-with-select" style="width: 340px;margin-right: 10px" :placeholder="getPlaceholder()"
                    v-model="inputContent"
                    maxlength=40
                    minlength=0
                    show-word-limit>
            <el-button slot="append" @click="saveFunAction()">{{getSaveTitle()}}</el-button>
          </el-input>
          <el-button type="text" @click="addFunAction(false)">{{getAddTitle(false)}}</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import isTheOne from '@/utils/util/isTheOne'
  export default {
    name: 'TitleAndRadioShowListComponentV2',
    components: {},
    props: {
      title: {
        type: String,
        default: ''
      },
      // {title: '测试内容测试内容23423测试内容234423测试内容sdfsdf测试内容', radio: '2', del: false}
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      lang: {
        type: String,
        default: 'cn'
      },
      maxLength: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        showValue: isTheOne.isUndefinedAndNull(this.value) ? [] : this.value,
        addFlag: false,
        showAddFlag: true,
        inputContent: ''
      }
    },
    mounted () {
      if (this.maxLength !== -1 && this.showValue.length === this.maxLength) {
        this.showAddFlag = false
      }
    },
    methods: {
      getPlaceholder () {
        if (this.lang === 'cn') {
          return '请输入内容'
        } else {
          return 'Please Enter Content'
        }
      },
      getShowTitle (isNormal) {
        if (isNormal) {
          if (this.lang === 'cn') {
            return '正常'
          } else {
            return 'Normal'
          }
        } else {
          if (this.lang === 'cn') {
            return '异常'
          } else {
            return 'Abnormal'
          }
        }
      },
      getAddTitle (isAdd) {
        if (isAdd) {
          if (this.lang === 'cn') {
            return '添加检测项'
          } else {
            return 'Add detection'
          }
        } else {
          if (this.lang === 'cn') {
            return '取消添加'
          } else {
            return 'Cancel Add'
          }
        }
      },
      getSaveTitle () {
        if (this.lang === 'cn') {
          return '保存'
        } else {
          return 'Save'
        }
      },
      addFunAction (flag) {
        if (flag) {
          this.addFlag = true
        } else {
          this.addFlag = false
        }
      },
      saveFunAction () {
        if (this.inputContent.trim().length > 0) {
          this.$emit('on-save-action', this.inputContent.trim())
        } else {
          this.$emit('on-save-action', '')
        }
      },
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.showValue = (this.value !== null && this.value !== undefined) ? this.value : []
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.showValue = val
      },
      onClearInputContent () {
        this.inputContent = ''
      },
      addItem (val) {
        this.showValue.push(val)
      }
    },
    watch: {
      'value' (to, form) {
        if (to !== undefined && to !== null) {
          this.showValue = to
        } else {
          this.showValue = []
        }
      }
    }
  }
</script>

<style scoped>
  .item-show-title-layout {
    width: 280px;
    margin-right: 10px;
    word-break:break-all;
  }
  .show-list-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
  }
</style>
