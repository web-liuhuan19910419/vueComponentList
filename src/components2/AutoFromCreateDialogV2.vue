<template>
  <div style="text-align: left;">
    <el-dialog v-if="visibleProp"
               :title.sync="this.$t(title)"
               :visible.sync="visibleProp"
               :close-on-click-modal="false"
               :before-close="closeDialog"
               :close-on-press-escape="false"
               :width="this.getWindowWidth()" top="15vh">
      <div class="mini-dialog-content dialog-content-bottom" :style="{'margin-top': `${dialogTop}px`}">
        <form-create v-model="fApi"
                     :rule="getDataRule()"
                     :option="option"
                     @searchs-click="searchChange"
                     @mounted="fcMounted"></form-create>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="margin-right: 10px" v-for="(btnItem, index) in this.btnList" :key="btnItem.toString()+index">
          <el-button v-if="btnItem.plain" :type="btnItem.uiType" :loading="btnItem.loading" @click="onConfirm(true, btnItem.funType)" plain>{{$t(btnItem.title)}}</el-button>
          <el-button v-else :type="btnItem.uiType" :loading="btnItem.loading" @click="onConfirm(true, btnItem.funType)">{{$t(btnItem.title)}}</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import formCreate from '@form-create/element-ui'
  import MutiLangBaseGridComponent2 from '@/components/MutiLangBaseGridComponent2'
  import MutiLangBaseGridComponent3V2 from '@/components2/MutiLangBaseGridComponent3V2'
  import MutiLangBaseGridComponent4 from '@/components/MutiLangBaseGridComponent4'
  import MutiLangBaseGridComponentV2 from '@/components2/MutiLangBaseGridComponentV2'
  import TitleAndSelectAndSearchComponent from '@/components2/TitleAndSelectAndSearchComponent2'
  import TitleAndInputLoopComponentV2 from '@/components2/TitleAndInputLoopComponentV2'
  import ScanContentComponentV2 from '@/components2/ScanContentComponentV2'
  import FileUploadComponentV2 from '@/components2/FileUploadComponentV2'
  import TitleAndContentComponent2 from '@/components2/TitleAndContentComponent2'
  import TitleAndContentComponentV2 from '@/components2/TitleAndContentComponentV2'
  import TitleAndSelectAndSearchComponentV2 from '@/components2/TitleAndSelectAndSearchComponentV2'
  import ScanContentComponentAndAppendV2 from '@/components2/ScanContentComponentAndAppendV2'
  import TitleAndShowTitleValueItemListComponentV2 from '@/components2/TitleAndShowTitleValueItemListComponentV2'
  import TitleAndExpandShowRowDataListComponentV2 from '@/components2/TitleAndExpandShowRowDataListComponentV2'
  import TitleAndSelectAndMutiInputLoopComponentV2 from '@/components2/TitleAndSelectAndMutiInputLoopComponentV2'
  import SingleBaseGridComponentV2 from '@/components2/SingleBaseGridComponentV2'
  import isTheOne from '@/utils/util/isTheOne'
  import TitleAndSelectAndNumberInputLoopComponentV2 from '@/components2/TitleAndSelectAndNumberInputLoopComponentV2'
  import TitleAndRadioButtonComponentV2 from '@/components2/TitleAndRadioButtonComponentV2'
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  import TitleAndMutiselectComponentV2 from '@/components2/TitleAndMutiselectComponentV2'
  import TitleAndInputAppendBtnComponentV2 from '@/components2/TitleAndInputAppendBtnComponentV2'
  import TitleAndInputAppendIconComponentV2 from '@/components2/TitleAndInputAppendIconComponentV2'
  import TitleAndMoreMutiInputLoopComponentV2 from '@/components2/TitleAndMoreMutiInputLoopComponentV2'
  import TitleAndNumberAndNumberInputLoopComponentV2 from '@/components2/TitleAndNumberAndNumberInputLoopComponentV2'
  import TitleAndInputComponentV2 from '@/components2/TitleAndInputComponentV2'
  import TitleAndDeliveryVoucherComponentV2 from '@/components2/TitleAndDeliveryVoucherComponentV2'
  import InputAndAddAndTableComponentV2 from '@/components2/InputAndAddAndTableComponentV2'
  import CreateInviteCodeComponent from '@/components2/CreateInviteCodeComponent'
  import TitleAndNumberInputAndTotalNumberComponentV2 from '@/components2/TitleAndNumberInputAndTotalNumberComponentV2'

  formCreate.component(MutiLangBaseGridComponent2.name, MutiLangBaseGridComponent2)
  formCreate.component(MutiLangBaseGridComponent3V2.name, MutiLangBaseGridComponent3V2)
  formCreate.component(MutiLangBaseGridComponent4.name, MutiLangBaseGridComponent4)
  formCreate.component(MutiLangBaseGridComponentV2.name, MutiLangBaseGridComponentV2)
  formCreate.component(TitleAndSelectAndSearchComponent.name, TitleAndSelectAndSearchComponent)
  formCreate.component(TitleAndInputLoopComponentV2.name, TitleAndInputLoopComponentV2)
  formCreate.component(ScanContentComponentV2.name, ScanContentComponentV2)
  formCreate.component(FileUploadComponentV2.name, FileUploadComponentV2)
  formCreate.component(TitleAndContentComponent2.name, TitleAndContentComponent2)
  formCreate.component(TitleAndContentComponentV2.name, TitleAndContentComponentV2)
  formCreate.component(TitleAndSelectAndSearchComponentV2.name, TitleAndSelectAndSearchComponentV2)
  formCreate.component(ScanContentComponentAndAppendV2.name, ScanContentComponentAndAppendV2)
  formCreate.component(TitleAndShowTitleValueItemListComponentV2.name, TitleAndShowTitleValueItemListComponentV2)
  formCreate.component(TitleAndExpandShowRowDataListComponentV2.name, TitleAndExpandShowRowDataListComponentV2)
  formCreate.component(TitleAndSelectAndMutiInputLoopComponentV2.name, TitleAndSelectAndMutiInputLoopComponentV2)
  formCreate.component(SingleBaseGridComponentV2.name, SingleBaseGridComponentV2)
  formCreate.component(TitleAndSelectAndNumberInputLoopComponentV2.name, TitleAndSelectAndNumberInputLoopComponentV2)
  formCreate.component(TitleAndRadioButtonComponentV2.name, TitleAndRadioButtonComponentV2)
  formCreate.component(TitleAndNumberInputComponentV2.name, TitleAndNumberInputComponentV2)
  formCreate.component(TitleAndMutiselectComponentV2.name, TitleAndMutiselectComponentV2)
  formCreate.component(TitleAndInputAppendBtnComponentV2.name, TitleAndInputAppendBtnComponentV2)
  formCreate.component(TitleAndInputAppendIconComponentV2.name, TitleAndInputAppendIconComponentV2)
  formCreate.component(TitleAndMoreMutiInputLoopComponentV2.name, TitleAndMoreMutiInputLoopComponentV2)
  formCreate.component(TitleAndNumberAndNumberInputLoopComponentV2.name, TitleAndNumberAndNumberInputLoopComponentV2)
  formCreate.component(TitleAndInputComponentV2.name, TitleAndInputComponentV2)
  formCreate.component(TitleAndDeliveryVoucherComponentV2.name, TitleAndDeliveryVoucherComponentV2)
  formCreate.component(InputAndAddAndTableComponentV2.name, InputAndAddAndTableComponentV2)
  formCreate.component(CreateInviteCodeComponent.name, CreateInviteCodeComponent)
  formCreate.component(TitleAndNumberInputAndTotalNumberComponentV2.name, TitleAndNumberInputAndTotalNumberComponentV2)

  export default {
    name: 'AutoFromCreateDialogV2',
    components: {
      formCreate: formCreate.$form()
    },
    props: {
      // 0 大窗口，1中窗口，2，小窗口
      windowTypeProp: {
        type: Number,
        default: 0
      },
      titleProp: {
        type: String,
        default: 'message.prompt'
      },
      visibleProp: {
        type: Boolean,
        default: false
      },
      mackDataProp: {
        type: Array,
        default: () => {
          return []
        }
      },
      btnListProp: {
        type: Array,
        default: () => {
          return [{title: 'message.okBtn', funType: 0, loading: false, uiType: 'primary', disabled: false}]
        }
      },
      dialogTop: {
        type: Number,
        default: -30
      },
      dynamicMackDataFun: {
        type: Function
      },
      // 调用着可以实现相关业务逻辑，需调用者实现
      fromCreateMounted: {
        type: Function
      }
    },
    data () {
      return {
        loading: false,
        rule: this.mackDataProp,
        option: {
          global: {
            input: {
              props: {
                disabled: false
              }
            }
          },
          form: {
            inline: false,
            // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
            labelPosition: 'left',
            // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
            labelWidth: '160px',
            // 是否显示必填字段的标签旁边的红色星号
            hideRequiredAsterisk: false,
            // 是否显示校验错误信息
            showMessage: true,
            // 是否以行内形式展示校验信息
            inlineMessage: true,
            // 是否在 rules 属性改变后立即触发一次验证
            validateOnRuleChange: true
          },
          // 显示表单重置按钮
          resetBtn: false,
          submitBtn: false,
          // form-create挂载
          mounted: function ($f) {
            console.log('form-create1 mounted', $f)
            // if (_that.fromCreateMounted) {
            //   _that.fromCreateMounted($f)
            // }
          }
        },
        fApi: {},
        btnList: (this.btnListProp === null || this.btnListProp === undefined) ? [{title: 'message.okBtn', funType: 0, loading: false, uiType: 'primary', disabled: false}] : this.btnListProp,
        title: isTheOne.isUndefinedAndNull(this.titleProp) ? '' : this.titleProp
      }
    },
    methods: {
      getWindowWidth () {
        if (this.windowTypeProp === 0) {
          return '74%'
        } else if (this.windowTypeProp === 1) {
          return '50%'
        } else {
          return '38%'
        }
      },
      // TODO 待测试，子组件同步调用父组件方法
      getDataRule () {
        if (!isTheOne.isUndefinedAndNull(this.dynamicMackDataFun)) {
          return this.dynamicMackDataFun()
        } else {
          return this.rule
        }
      },
      onConfirm (flag, funType) {
        this.loading = true
        this.fApi.validate((valid) => {
          console.log('valid =' + valid)
          if (valid) {
            // TODO 验证通过
            console.log('formD2=' + JSON.stringify(this.fApi.formData()))
            this.$emit('on-button-close', {'flag': true, funType: funType, 'data': this.fApi.formData()})
          } else {
            // TODO 验证未通过
            this.loading = false
          }
        })
      },
      closeDialog () {
        this.loading = false
        this.$emit('on-button-close', {'flag': false, funType: -1, 'data': this.fApi.formData()})
      },
      searchChange () {
        console.log('searchChange')
        this.$emit('on-button-search', this.fApi.formData())
      },
      fcMounted ($f) {
        console.log('form-create mounted', $f)
        if (this.fromCreateMounted) {
          this.fromCreateMounted(this.fApi)
        }
      },
      modifyLoading (flag) {
        this.loading = flag
      }
    },
    mounted () {
      console.log(this.fApi)
      this.btnList = (this.btnListProp === null || this.btnListProp === undefined) ? [{title: 'message.okBtn', funType: 0, loading: false, uiType: 'primary', disabled: false}] : this.btnListProp
    },
    watch: {
      titleProp (to, from) {
        if (!isTheOne.isUndefinedAndNull(to)) {
          this.title = to
        } else {
          this.title = ''
        }
      },
      btnListProp (to, from) {
        if (!isTheOne.isUndefinedAndNull(to)) {
          this.btnList = to
        }
      }
    }
  }
</script>

<style scoped>
  .dialog-content-bottom {
    margin-bottom: -10px;
  }

  .form-create >>> .el-form-item {
    margin-bottom: 2px;
  }

  .form-create >>> .el-form-item--mini.el-form-item,.el-form-item--small.el-form-item {
    margin-bottom: 2px;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
  }

</style>
