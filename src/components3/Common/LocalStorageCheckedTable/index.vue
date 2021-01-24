<template>
  <!--具有本地存储选中选项的表格-->
  <div>
    <base-table
      ref="memoryCheckedRef"
      v-model="tableObject"
      v-bind="getProps"
      @on-operating-action="onOperatingAction"
      @returnObjectBack="returnObjectBack"
      @input="onOriginTableChange"
      @on-table-selection-change="onTableSelectChange"
    />
    <select-check ref="optionAllComponentRef" @input="onTableCheckedAll"> </select-check>
  </div>
</template>
<script>
import BaseTable from '@/components/Common/BaseTable'
import SelectCheck from '@/components/Common/SelectCheck'
import { mapMutations } from 'vuex'
const initOperatingFun = () => {
  return [{ useIcon: true, title: 'el-icon-close' }]
}
export default {
  name: 'LocalStorageCheckedTable',
  props: {
    storageName: String,
    border: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: -1
    },
    maxHeight: {
      type: Number,
      default: -1
    },
    // form-create  使用到参数value，disabled 一般是运行的值或显示的值
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表头基础属性（name: 名称；prod：表格显示绑定属性；width：宽度；type: tableColumnType, colmunDataFun: 列数据）
    baseAttrs: Array,
    cellDataFun: {
      type: Function,
      default: () => {
        return initOperatingFun()
      }
    },
    // 表格的行高
    rowHeight: {
      type: Number,
      default: 30
    },
    showOverflowTooltip: {
      type: Boolean,
      default: false
    },
    // 是否多选
    selection: {
      type: Boolean,
      default: false
    },
    // 是否记录多选（仅仅内存记录）
    recordSelectionFlag: {
      type: Boolean,
      default: false
    },
    // 数据唯一索引字段 (用于多选或者其它)
    uniqueIndexKey: {
      type: String,
      default: 'id'
    },
    tableProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    BaseTable,
    SelectCheck
  },
  data() {
    return {
      tableObject: null,
      checkAllFlag: false
    }
  },
  computed: {
    getProps() {
      return {
        border: this.border,
        height: this.height,
        maxHeight: this.maxHeight,
        value: this.value,
        disabled: this.disabled,
        showValue: this.showValue,
        baseAttrs: this.baseAttrs,
        cellDataFun: this.cellDataFun,
        selection: this.selection,
        uniqueIndexKey: this.uniqueIndexKey,
        tableProps: this.tableProps
      }
    }
  },
  methods: {
    ...mapMutations('sessionDataModule', {
      configAddMutiCheckedCache: 'configAddMutiCheckedCache',
      configDeleteMutiCheckedCache: 'configDeleteMutiCheckedCache'
    }),
    onOperatingAction(row, actionIndex, attr) {
      this.$emit('on-operating-action', row, actionIndex, attr)
    },
    onOriginTableChange(tableData) {
      this.$emit('input', tableData)
    },
    returnObjectBack() {
      this.$emit('returnObjectBack', this)
    },
    onTableSelectChange(content, selectData, row) {
      console.log('选择类型' + content)
      console.log(selectData)
      if (selectData.length === this.value.length) {
        // 全选
        this.checkAllFlag = true
      } else {
        // 全不选
        this.checkAllFlag = false
      }
      if (!content) {
        // 单选
        let currentRow = row
        this.onFind(currentRow)
      } else {
        // 全选
        console.log(this.value)
        console.log(selectData)
        let currentSelectData = []
        if (selectData.length === 0) {
          // 全不选状态
          for (let item of this.value) {
            item.checked = 0
            currentSelectData.push(item)
          }
        } else {
          // 全选状态
          currentSelectData = selectData
        }
        console.log(currentSelectData)
        for (let index = 0; index < currentSelectData.length; index++) {
          let currentRow = currentSelectData[index]
          this.onFind(currentRow)
        }
      }
      console.log(this.$store.state.sessionDataModule.mutiCheckedCache[this.storageName])
      this.$emit(
        'on-remember-all-checked',
        this.$store.state.sessionDataModule.mutiCheckedCache[this.storageName]
      )
    },
    onFind(row) {
      // 查找字典过程
      let flag = this.$lodash.findIndex(
        this.$store.state.sessionDataModule.mutiCheckedCache[this.storageName],
        o => {
          return o[this.uniqueIndexKey] === row[this.uniqueIndexKey]
        }
      ) // 看看原来有没有存储这个
      if (row.checked === 1) {
        // 当前行是选中
        if (flag === -1) {
          // 如果原来没有存储，就存进去
          this.configAddMutiCheckedCache({ rowData: row, key: this.storageName })
        } else {
          // 原来有存储什么都不用做
        }
      } else {
        // 当前行是不选中
        if (flag !== -1) {
          // 如果原来有存储，就删除掉这个
          this.configDeleteMutiCheckedCache({ index: flag, key: this.storageName })
        } else {
          // 原来没有存储,就什么都不用做
        }
      }
    },
    onTableCheckedAll(value) {
      console.log('当前多选')
      console.log(value)
      if (value) {
        // 全部多选
        this.tableObject.toggleAllSelection()
      } else {
        // 清除多选
        this.tableObject.cleanAllSelection()
      }
    }
  },
  watch: {
    checkAllFlag(to, from) {
      console.log(to, from)
      this.$refs.optionAllComponentRef.onSetValue(to)
    }
  },
  mounted() {
    console.log(this.$store.state.sessionDataModule.mutiCheckedCache[this.storageName])
  }
}
</script>
<style lang="scss" scoped></style>
