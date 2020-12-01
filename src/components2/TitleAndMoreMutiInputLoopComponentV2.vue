<template>
    <div style="text-align: left;display: flex">
      <span class="main-color-text-primary" :style="{width: `160px`}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{this.title}}</span>
      <div style="margin-left: 10px">
        <div class="select-input-layout">
          <div style="display: flex;font-size: 12px;margin-bottom: 10px;">
            <p style="width: 300px;">{{getItemTitleList(0)}}</p>
            <p style="margin-left: 5px;width: 180px">{{getItemTitleList(1)}}</p>
            <p style="margin-left: 5px;width: 300px">{{getItemTitleList(2)}}</p>
            <p style="margin-left: 5px;width: 140px">{{getItemTitleList(3)}}</p>
          </div>
          <div class="select-input-row-layout" v-for="(item, index) in showValue" :key="index.toString()">
            <el-input style="width: 300px;" v-model="item.nameValue" :clearable="true"
                      @input="e => inputContentNameChange(index, e)"></el-input>
            <el-input style="margin-left: 5px;width: 180px" v-model="item.codeValue" :clearable="true"
                      @input="e => inputContentCodeChange(index, e)"></el-input>
            <el-input style="margin-left: 5px;width: 300px" v-model="item.linkValue" :clearable="true"
                      @input="e => inputContentLinkChange(index, e)"></el-input>
            <el-input-number style="margin-left: 5px;width: 140px" v-model="item.priceValue" :precision="2" :min="0"
                             @input="e => inputContentPriceChange(index, e)"></el-input-number>
            <i v-if="index >= minItemSize" class="el-icon-remove-outline el-icon-circle-plus-outline-layout" @click="removeClick(index)"></i>
          </div>
        </div>
        <i v-if="showValue.length <= maxItemSize" class="el-icon-circle-plus-outline el-icon-circle-plus-outline-layout" @click="addClick()" :style="{'margin-left': `${10}px`}"></i>
      </div>
    </div>
</template>

<script>
  import SingleSelectComponentV2 from '@/components2/TitleAndSingleSelectComponentV2'
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  import TitleAndInputComponentV2 from '@/components2/TitleAndInputComponentV2'
  export default {
    name: 'TitleAndMoreMutiInputLoopComponentV2',
    components: {
      SingleSelectComponentV2,
      TitleAndNumberInputComponentV2,
      TitleAndInputComponentV2
    },
    props: {
      isMustProp: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      itemTitleList: {
        type: Array,
        default: () => {
          return ['Product Name', 'Product Code', 'Link', 'Purchase Price($)']
        }
      },
      value: {
        type: Array,
        default: () => {
          return [{nameValue: '', codeValue: '', linkValue: '', priceValue: ''},
            {nameValue: '', codeValue: '', linkValue: '', priceValue: ''}]
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
      },
      // 一个初始值函数 'PO' + (new Date()).getTime()
      initSpecialValue: {
        type: Function
      }
    },
    data () {
      return {
        showValue: (this.value !== null && this.value !== undefined) ? this.value : [],
        hideAddFlag: false
      }
    },
    methods: {
      inputContentNameChange (content) {
        this.$emit('input-change', this.showValue)
      },
      inputContentCodeChange (content) {
        this.$emit('input-change', this.showValue)
      },
      inputContentLinkChange (content) {
        this.$emit('input-change', this.showValue)
      },
      inputContentPriceChange (content) {
        this.$emit('input-change', this.showValue)
      },
      removeClick (index) {
        this.showValue.splice(index, 1)
        this.$emit('input', this.showValue)
      },
      addClick () {
        let codeV = ''
        if (this.initSpecialValue !== undefined) {
          codeV = this.initSpecialValue()
        }
        this.showValue.push({nameValue: '', codeValue: codeV, linkValue: '', priceValue: ''})
        this.$emit('input', this.showValue)
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
        this.showValue = (this.value !== null && this.value !== undefined) ? this.value : []
      }
    },
    computed: {
      getItemTitleList () {
        return (index) => {
          return this.itemTitleList[index]
        }
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
