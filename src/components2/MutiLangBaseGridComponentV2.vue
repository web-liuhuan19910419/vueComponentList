<template>
  <div class="grid-layout">
    <el-table
      id="custom-table-v2"
      ref="customtableRefV2"
      :data="tableData"
      border
      :height="getTableHeight()"
      :max-height="getMaxTableHeight()"
      :row-style="rowStyle"
      :cell-style="{padding:5+'px'}"
      :header-cell-style="headerStyle"
      style="width: 100%"
      tooltip-effect="dark"
      :show-overflow-tooltip="this.showOverflowTooltip"
      @select="handleSingleSelection"
      @select-all="handleAllSelection">
      <div slot="empty" style="background-color: transparent;">
      </div>
      <el-table-column v-if="selection"
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column v-for="(item, index) in attrs" :key="index" fixed :label="$t(item.name)" :min-width="item.width"
                       :sortable="getSortable(item)"
                       :sort-method="(obj1, obj2) => {sortFun(obj1, obj2, item)}">
        <template slot-scope="scope">
          <div v-if="item.type === 0" v-html="scope.row[item.attr]"></div>
          <div v-else-if="item.type === 1 && tableData.length > 0" style="display: flex; flex-wrap: wrap;">
            <div style="margin-right: 10px;" v-for="(bItem, bIndex) in item.fun(scope.$index)" :key="bIndex.toString()">
              <el-button v-if="!bItem.useIcon" @click="handleFunClick(scope.$index, bIndex, item.attr)" type="text">{{bItem.title}}</el-button>
              <el-button v-else @click="handleFunClick(scope.$index, bIndex, item.attr)" :class="bItem.title" style="font-size: 20px;" type="text"></el-button>
            </div>
          </div>
          <div v-else-if="item.type === 2 && tableData.length > 0" style="display: flex; flex-wrap: wrap;">
            <div style="margin-right: 10px;" v-for="(bItem, bIndex) in item.publicShowFun(scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index, scope.row.srcObj)" :key="bIndex.toString()">
              <el-button v-if="!bItem.useIcon" @click="handlePublicFunClick(bIndex, item, scope)" type="text">{{bItem.title}}</el-button>
              <el-button v-else @click="handlePublicFunClick(bIndex, item, scope)" :class="bItem.title" style="font-size: 20px;" type="text"></el-button>
            </div>
          </div>
          <div v-else-if="item.type === 3 && tableData.length > 0" style="display: flex; flex-wrap: wrap;">
            <div>
              <el-input-number v-if="item.conditionFun !== undefined"
                               v-model="scope.row.changeObj[item.attr]"
                               :min="item.conditionFun(scope.$index).min"
                               :max="item.conditionFun(scope.$index).max"
                               @change="(content) => { handleInputFunClick(content, scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index, scope.row, item) }" />
              <el-input-number v-else
                               v-model="scope.row.changeObj[item.attr]"
                               @change="(content) => { handleInputFunClick(content, scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index, scope.row, item) }" />
            </div>
          </div>
          <div v-else-if="item.type === 4 && tableData.length > 0" style="display: flex; flex-wrap: wrap;">
            <div>
              <el-select v-model="scope.row.changeObj[item.attr]" :placeholder="item.placeholder !== undefined ? item.placeholder : ''" @change="(content) => { handleInputFunClick(content, scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index, scope.row, item) }">
                <el-option
                  v-for="itemOption in item.options"
                  :key="itemOption.value"
                  :label="itemOption.label"
                  :value="itemOption.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-else-if="item.type === 10 && tableData.length > 0" style="display: flex; flex-wrap: wrap;">
            <!--            待完善-->
            <slot name="customContent" v-bind="scope"></slot>
          </div>
          <div v-else v-html="scope.row[item.attr]"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<!--单多选待 使用方法-->
<!-- <muti-lang-base-grid-component-v2-->
<!--  ref="prductOnTheWayLayoutRef"-->
<!--  v-model="tableObject"-->
<!--  :row-height="40"-->
<!--  :base-attrs="processGridTitle()"-->
<!--  :value="processAdminWarehouseInboundPlanWorkList()"-->
<!--  :record-selection-flag="true"-->
<!--  uniqueIndexKey="waybillNumber"-->
<!--  :height="this.$globalConst.getShowWindowHeight(2, true, true)"-->
<!--  @on-table-selection-all-status="onGridSelectionAllStatus"-->
<!--  @on-operating-action="onInhandTableActions"/>-->
<!--现在只能通过ref控制-->
<!--<option-all-componentV2-->
<!--  ref="optionAllComponentRef"-->
<!--  @on-option-all-switch-change="onGridSwitchOptionAll">-->
<!--</option-all-componentV2>-->

<script>
  // changeObj 监听动态属性变化，type === 3，4用到
  // eslint-disable-next-line no-unused-vars
  const tableColumnType = {
    // 正常显示
    normal: 0,
    // 操作
    operating: 1,
    // 公共操作，尽可能使用这个
    other: 2,
    // 数字输入
    numberInput: 3,
    // 选择
    select: 4
  }
  const initOperatingFun = () => {
    return [{useIcon: true, title: 'el-icon-close'}]
  }
  export default {
    name: 'MutiLangBaseGridComponentV2',
    props: {
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
      // 默认选中数据
      selectData: {
        type: Array,
        default: () => {
          return []
        }
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
      }
    },
    data () {
      return {
        currentClickRow: -1,
        tableData: [],
        // 选中数据
        multipleSelection: this.selectData !== undefined ? this.selectData : [],
        attrs: [],
        tableObject: null,
        selectObj: {}
      }
    },
    model: {
      prop: 'tableObject',
      event: 'returnBack'
    },
    computed: {
    },
    filters: {
    },
    methods: {
      getSortable (item) {
        if (item.sortable !== undefined && item.sortable === true) {
          return true
        } else {
          return false
        }
      },
      // 排序数据
      sortFun (obj1, obj2, item) {
        if (item.sortFun !== undefined) {
          // 第三个参数是对应的属性
          //  sortFun (value, value2, column) {
          //   var at = value[column]
          //   var bt = value2[column]
          //   if (at >= bt) {
          //     return 1
          //   } else {
          //     return -1
          //   }
          // },
          return item.sortFun(obj1, obj2, item.attr)
        } else {
          return null
        }
      },
      getTableHeight () {
        if (this.height === -1) {
          return null
        } else {
          return this.height
        }
      },
      getMaxTableHeight () {
        if (this.maxHeight === -1) {
          return null
        } else {
          return this.maxHeight
        }
      },
      rowStyle ({row, rowIndex}) {
        return {
          color: '#484848',
          height: this.rowHeight + 'px'
        }
      },
      headerStyle ({row, column, rowIndex, columnIndex}) {
        return {
          color: '#484848',
          height: '35px',
          padding: '0px',
          background: '#DDE7F6'
        }
      },
      defaultSelectCheck (tValue) {
        if (tValue !== undefined) {
          let _that = this
          _that.$nextTick(() => {
            _that.multipleSelection.forEach(rowData => {
              let tmpD = _that.gridData
              _that.$refs.drawerMultipleTable.toggleRowSelection(tmpD.find(item => {
                return rowData[this.uniqueIndexKey] === item[this.uniqueIndexKey] // 注意这里寻找的字段要唯一
              }), true)
            })
          })
        }
      },
      // 行选中函数  若有删除，若无添加
      handleSingleSelection (selection, rowData) {
        this.multipleSelection = selection
        if (this.recordSelectionFlag) {
          if (this.selectObj[rowData[this.uniqueIndexKey]]) {
            delete this.selectObj[rowData[this.uniqueIndexKey]]
          } else {
            this.selectObj[rowData[this.uniqueIndexKey]] = rowData[this.uniqueIndexKey]
          }
          // 通知有选中数据有变化
          this.$emit('on-table-selection-select-object-data', this.selectObj)
        }

        // 是否全部选中
        if (this.multipleSelection.length === this.tableData.length) {
          this.$emit('on-table-selection-all-status', true)
        } else {
          this.$emit('on-table-selection-all-status', false)
        }
      },
      // 全选函数  点击全选遍历当页数据若无添加,若是反选则删除(判断是否是全选还是反选)
      handleAllSelection (selection) {
        this.multipleSelection = selection
        if (this.recordSelectionFlag) {
          this.multipleSelection.forEach((rowData, index) => {
            if (this.selectObj.hasOwnProperty(rowData[this.uniqueIndexKey])) {
              if (this.multipleSelection.length === 0) {
                delete this.selectObj[rowData[this.uniqueIndexKey]]
              }
            } else {
              this.selectObj[rowData[this.uniqueIndexKey]] = rowData[this.uniqueIndexKey]
            }
          })
          // 通知有选中数据有变化
          this.$emit('on-table-selection-select-object-data', this.selectObj)
        }

        // 是否全部选中
        if (this.multipleSelection.length === this.tableData.length) {
          this.$emit('on-table-selection-all-status', true)
        } else {
          this.$emit('on-table-selection-all-status', false)
        }
      },
      // 记忆选中函数：每次请求数据遍历当页数据，显示已经被选中的数据
      memoryChecked () {
        let selectDataCount = 0
        this.tableData.forEach((rowData, index) => {
          if (this.selectObj.hasOwnProperty(rowData[this.uniqueIndexKey])) {
            selectDataCount++
            this.$refs.customtableRefV2.toggleRowSelection(rowData, true)
          } else {
            this.$refs.customtableRefV2.toggleRowSelection(rowData, false)
          }
        })

        if (selectDataCount === this.tableData.length) {
          this.$emit('on-table-selection-all-status', true)
        } else {
          this.$emit('on-table-selection-all-status', false)
        }
      },
      // 选中指定行数据数组 rowDatas 必须是gridData里面数据
      toggleSelection (rowDatas) {
        if (rowDatas) {
          rowDatas.forEach(rowData => {
            this.$refs.customtableRefV2.toggleRowSelection(rowData, true)
          })
        }
      },
      // 全选
      toggleAllSelection () {
        this.$refs.customtableRefV2.toggleAllSelection()
      },
      // 取消指定行数组
      cleanRowSelection (rowDatas) {
        if (rowDatas) {
          rowDatas.forEach(rowData => {
            this.$refs.customtableRefV2.toggleRowSelection(rowData, false)
          })
        }
      },
      // 清空所以选中
      cleanAllSelection () {
        this.$refs.customtableRefV2.clearSelection()
      },
      // form-create
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        if (this.value !== undefined && this.value !== null && Array.isArray(this.value)) {
          this.tableData = this.value
        } else {
          this.tableData = []
        }
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
      handleFunClick (row, actionIndex, attr) {
        this.$emit('on-operating-action', row, actionIndex, attr)
      },
      handlePublicFunClick (actionIndex, item, scope) {
        if (item !== undefined && item.publicClickFun !== undefined) {
          item.publicClickFun(scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index, actionIndex, item.attr, scope.row.srcObj)
        } else {
          this.$emit('on-operating-action', scope.row.indexSNO, actionIndex, item.attr)
        }
      },
      handleInputFunClick (content, indexSNO, rowData, item) {
        console.log('handleInputFunClick =' + content)
        if (item !== undefined && item.changeValueFun !== undefined) {
          item.changeValueFun(indexSNO, rowData.srcObj, this.tableData)
        }

        this.$emit('input', this.tableData)
      },
      initSelectObj (selectObj) {
        this.selectObj = selectObj
      }
    },
    beforeMount () {
      this.$emit('returnBack', this)
    },
    mounted () {
      if (this.value !== undefined && this.value !== null && Array.isArray(this.value)) {
        this.tableData = this.value
      }

      if (this.baseAttrs !== undefined && this.baseAttrs !== null && Array.isArray(this.value)) {
        this.attrs = this.baseAttrs
      }

      if (this.selection) {
        this.defaultSelectCheck(this.multipleSelection)
      }
    },
    watch: {
      value (to, from) {
        if (to !== undefined && to !== null && Array.isArray(to)) {
          this.tableData = to
        }
      },
      baseAttrs (to, from) {
        if (to !== undefined && to !== null && Array.isArray(to)) {
          this.attrs = to
        }
      },
      selectData: {
        handler (newValue, oldValue) {
          if (newValue !== undefined) {
            // 必须先设置value
            this.multipleSelection = newValue
            this.defaultSelectCheck(this.multipleSelection)
          }
        },
        deep: true
      }
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

  .el-table::before {
    height: 0px;
  }

  .el-table__fixed::before {
    height: 0px
  }

</style>
