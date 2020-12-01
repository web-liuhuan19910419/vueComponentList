<template>
  <div style="text-align: left">
    <title-and-number-input-component-v2
      v-if="getIsShowTotalPurchase"
      titleWidthProp="120px"
      :title-prop="itemTitleList[2]"
      :min-value="1"
      :max-value="10000"
      :value="showValue.total"
      @on-input-content-change="onTotalNumber"/>
    <el-checkbox style="" v-model="checkedAllFlag"
                 @change="e => handleAllCheckedCitiesChange(e)">{{checkAllTitle}}</el-checkbox>
    <div v-for="(item, index) in showValue.list" :key="index.toString()" style="display: flex;flex-direction: row;height: 30px;align-items: center;">
      <el-checkbox v-model="item.checked" style="width: 120px" @change="e => handleCheckedCitiesChange(index, e)">{{item.title}}</el-checkbox>
      <title-and-number-input-component-v2
        v-if="item.checked && item.isShowNumber"
        style="margin-left: 20px"
        titleWidthProp="120px"
        :title-prop="itemTitleList[0]"
        :min-value="1"
        :max-value="10000"
        :value="item.number"
        :tag="index"
        @on-input-content-change="onNumberOne"/>
      <title-and-number-input-component-v2
        v-if="item.checked && item.isShowSelfNumber"
        style="margin-left: 20px"
        titleWidthProp="120px"
        :title-prop="itemTitleList[1]"
        :min-value="0"
        :precision="2"
        :value="item.selfCost"
        :tag="index"
        @on-input-content-change="onNumberTwo"/>
    </div>
  </div>
</template>

<script>
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  export default {
    name: 'WarehouseProcessNumberComponentV2',
    components: {
      TitleAndNumberInputComponentV2
    },
    props: {
      value: {
        type: Object,
        default: () => {
          return {
            total: '0',
            list: [
              {title: 'Test1', checked: false, id: '0', number: '0', selfCost: '0', isShowNumber: false, isShowSelfNumber: false},
              {title: 'Test2', checked: false, id: '1', number: '0', selfCost: '0', isShowNumber: false, isShowSelfNumber: false}
            ]
          }
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checkAllTitle: {
        type: String,
        default: 'CheckAll'
      },
      itemTitleList: {
        type: Array,
        default: () => {
          return ['PurchaseNumber', 'SelfStorageCost($)', 'TotalPurchase']
        }
      },
      isShowotalPurchase: {
          type: Boolean,
          default: false
        }
    },
    data () {
      return {
        checkedAllFlag: false,
        showValue: (this.value !== null && this.value !== undefined) ? this.value : {total: '0', list: []}
      }
    },
    methods: {
      handleSelectData () {
        if (this.showValue.list !== undefined && this.showValue.list.length > 0) {
          let flag = true
          for (let index = 0; index < this.showValue.list.length; index++) {
            if (!this.showValue.list[index].checked) {
              flag = false
              break
            }
          }

          if (flag) {
            this.checkedAllFlag = true
          } else {
            this.checkedAllFlag = false
          }
        } else {
          this.checkedAllFlag = false
        }
      },
      onTotalNumber (data) {
        this.showValue.total = data.data.toString()
        this.$emit('input', this.showValue)
      },
      onNumberOne (data) {
        if (data.tag >= 0 && data.tag < this.showValue.list.length) {
          this.showValue.list[data.tag].number = data.data
        }

        this.$emit('input', this.showValue)
      },
      onNumberTwo (data) {
        if (data.tag >= 0 && data.tag < this.showValue.list.length) {
          this.showValue.list[data.tag].selfCost = data.data
        }

        this.$emit('input', this.showValue)
      },
      handleAllCheckedCitiesChange (check) {
        for (let index = 0; index < this.showValue.list.length; index++) {
          this.showValue.list[index].checked = check
        }

        this.$emit('input', this.showValue)
      },
      handleCheckedCitiesChange (index, check) {
        if (index >= 0 && index < this.showValue.list.length) {
          this.showValue.list[index].checked = check
        }

        if (this.showValue.list.length > 0) {
          let flag = true
          for (let index = 0; index < this.showValue.list.length; index++) {
            if (!this.showValue.list[index].checked) {
              flag = false
              break
            }
          }

          if (flag) {
            this.checkedAllFlag = true
          } else {
            this.checkedAllFlag = false
          }
        } else {
          this.checkedAllFlag = false
        }

        this.$emit('input', this.showValue)
      },
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.showValue = (this.value !== null && this.value !== undefined) ? this.value : {total: '0', list: []}
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.showValue = val
      }
    },
    computed: {
      getIsShowTotalPurchase () {
        return this.isShowotalPurchase
      }
    },
    mounted () {
      this.handleSelectData()
    },
    watch: {
      value (to, from) {
        if (to !== undefined) {
          this.showValue = to

          if (this.showValue.list.length > 0) {
            let flag = true
            for (let index = 0; index < this.showValue.list.length; index++) {
              if (!this.showValue.list[index].checked) {
                flag = false
                break
              }
            }

            if (flag) {
              this.checkedAllFlag = true
            } else {
              this.checkedAllFlag = false
            }
          } else {
            this.checkedAllFlag = false
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
