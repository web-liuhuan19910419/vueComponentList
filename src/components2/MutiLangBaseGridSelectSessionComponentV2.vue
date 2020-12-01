<template>
  <muti-lang-base-grid-component-v2
    :selection="true"
    :record-selection-flag="true"
    :uniqueIndexKey="getUniqueIndexKey"
    :row-height="getRowHeight"
    :height="getHeight"
    v-model="multipiChoiceTableObject"
    :base-attrs="getBaseAttrs"
    :value="getValue"
    :select-data="this.getSelectData"
  />
<!--  在下面事件中做数据保存-->
<!--  @on-table-selection-select-object-data=" 选中数据变化"-->
<!--  @on-table-selection-all-status="全选变化"-->
</template>

/** 单多选 保存到sesison,待完善
*/

<script>
  import MutiLangBaseGridComponentV2 from '@/components2/MutiLangBaseGridComponentV2'

  const initOperatingFun = () => {
    return [{useIcon: true, title: 'el-icon-close'}]
  }
  export default {
    name: 'MutiLangBaseGridSelectSessionComponentV2',
    components: {
      MutiLangBaseGridComponentV2
    },
    props: {
      height: {
        type: Number,
        default: -1
      },
      maxHeight: {
        type: Number,
        default: -1
      },
      // form-create  使用到参数value，disabled
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
      rowHeight: {
        type: Number,
        default: 30
      },
      selection: {
        type: Boolean,
        default: false
      },
      selectData: {
        type: Array,
        default: () => {
          return []
        }
      },
      recordSelectionFlag: {
        type: Boolean,
        default: false
      },
      // 数据唯一索引字段
      uniqueIndexKey: {
        type: String,
        default: 'id'
      }
    },
    data () {
      return {
        multipiChoiceTableObject: null
      }
    },
    model: {
      prop: 'multipiChoiceTableObject',
      event: 'returnBack'
    },
    computed: {
      getHeight () {
        return this.height
      },
      getRowHeight () {
        return this.rowHeight
      },
      getUniqueIndexKey () {
        return this.uniqueIndexKey
      },
      getValue () {
        return this.value
      },
      getBaseAttrs () {
        return this.baseAttrs
      },
      getSelectData () {
        return this.selectData
      }
    },
    filters: {
    },
    methods: {
      // form-create
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.tableData = val
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetAttrs (val, $f) {
        this.attrs = val
      },
      onSetShowValue (val) {
        this.showValue = val
      },
      // key 为了区分不同页面数据，防止数据过多
      initSelectObj (key) {
        // data就是本地保存的书 data 只记录数据索引，例如：{ key:key},data就是要
        let data = sessionStorage.getItem(key)
        this.multipiChoiceTableObject.initSelectObj(data)
      },
      defaultSelectCheck (tValue) {
        this.multipiChoiceTableObject.defaultSelectCheck(tValue)
      },
      // 行选中函数  若有删除，若无添加
      handleSingleSelection (selection, rowData) {
        this.multipiChoiceTableObject.handleSingleSelection(selection, rowData)
      },
      // 全选函数  点击全选遍历当页数据若无添加,若是反选则删除(判断是否是全选还是反选)
      handleAllSelection (selection) {
        this.multipiChoiceTableObject.handleAllSelection(selection)
      },
      // 记忆选中函数：每次请求数据遍历当页数据，显示已经被选中的数据
      // selectData 只记录数据索引，例如：{ key:key}
      recordingChecked (selectData) {
        this.multipiChoiceTableObject.memoryChecked()
      },
      // 选中指定行数据数组 rowDatas 必须是gridData里面数据
      toggleSelection (rowDatas) {
        this.multipiChoiceTableObject.toggleSelection()
      },
      // 全选
      toggleAllSelection () {
        this.multipiChoiceTableObject.toggleAllSelection()
      },
      // 取消指定行数组
      cleanRowSelection (rowDatas) {
        this.multipiChoiceTableObject.cleanRowSelection(rowDatas)
      },
      // 清空所以选中
      cleanAllSelection () {
        this.multipiChoiceTableObject.cleanAllSelection()
      }
    },
    beforeMount () {
      this.$emit('returnBack', this)
    },
    mounted () {
    },
    watch: {
    }
  }
</script>

<style >

  .grid-layout{
    font-size: 14px;
  }

  .el-table .cell {
    white-space: pre-line;
  }

  .grid-layout .el-table .cell {
    white-space: pre-line;
  }

</style>
