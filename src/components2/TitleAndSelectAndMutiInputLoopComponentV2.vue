<template>
    <div>
      <span class="main-title-value-color">{{this.title}}</span>
      <div class="select-input-layout">
        <div class="select-input-row-layout" v-for="(item, index) in showValue" :key="index.toString()">
          <single-select-component-v2
            style="margin-right: 10px"
            :title="itemTitleList[0]"
            :is-show-title=true
            :show-title-width="60"
            :options-prop="showOptions"
            :value="item.charges"
            :tag="index"
            @on-select-change="onSelectChange"
          >
          </single-select-component-v2>
          <title-and-number-input-component-v2
            style="margin-right: 10px"
            :title-prop="itemTitleList[1]"
            :min-value=-Infinity
            :precision="2"
            :value="item.cost"
            :tag="index"
            @on-input-content-change="onNumberInputContentChange"
          >
          </title-and-number-input-component-v2>
          <title-and-input-component-v2
            :title-prop="itemTitleList[2]"
            :maxlength-prop="40"
            :placeholder="$t('message.pleaseEnterContent') + ' max 40 Characters'"
            :value="item.note"
            :tag="index"
            @on-input-content-change="onInputContentChange"
          >
          </title-and-input-component-v2>
          <i v-if="index >= minItemSize" class="el-icon-remove-outline el-icon-circle-plus-outline-layout" @click="removeClick(index)"></i>
        </div>
      </div>
      <i v-if="showValue.length <= maxItemSize" class="el-icon-circle-plus-outline el-icon-circle-plus-outline-layout" @click="addClick()" :style="{'margin-left': `${60+10}px`}"></i>
    </div>
</template>

<script>
  import SingleSelectComponentV2 from '@/components2/TitleAndSingleSelectComponentV2'
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  import TitleAndInputComponentV2 from '@/components2/TitleAndInputComponentV2'
  import isTheOne from '@/utils/util/isTheOne'
  export default {
    name: 'TitleAndSelectAndMutiInputLoopComponentV2',
    components: {
      SingleSelectComponentV2,
      TitleAndNumberInputComponentV2,
      TitleAndInputComponentV2
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      itemTitleList: {
        type: Array,
        default: () => {
          return ['Charges', 'Cost', 'Note']
        }
      },
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      options: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      minItemSize: {
        type: Number,
        default: 1
      },
      maxItemSize: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        showValue: (this.value !== null && this.value !== undefined) ? this.value : [],
        showOptions: !isTheOne.isUndefinedAndNull(this.options) ? this.options : [],
        hideAddFlag: false
      }
    },
    mounted () {
      // this.showValue = [{charges: '', cost: '', note: ''}, {charges: '', cost: '', note: ''}]
    },
    methods: {
      onSelectChange (content, tag) {
        if (tag >= 0 && tag < this.showValue.length) {
          this.showValue[tag].charges = content
        }

        this.$emit('input', this.showValue)
      },
      onNumberInputContentChange (content) {
        if (content.tag >= 0 && content.tag < this.showValue.length) {
          this.showValue[content.tag].cost = content.data.toString()
        }

        this.$emit('input', this.showValue)
      },
      onInputContentChange (content) {
        if (content.tag >= 0 && content.tag < this.showValue.length) {
          this.showValue[content.tag].note = content.data
        }

        this.$emit('input', this.showValue)
      },
      removeClick (index) {
        this.showValue.splice(index, 1)
      },
      addClick () {
        this.showValue.push({charges: '', cost: '', note: ''})
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
      onSetOptions (val) {
        this.showOptions = val
      }
    },
    watch: {
      value (to, from) {
        // 同步 value 的值
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
  .select-input-row-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .select-input-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  .el-icon-circle-plus-outline-layout {
    margin-top: 6px;
    font-size: 20px;
    margin-left: 15px;
    color: #484848;
  }

</style>
