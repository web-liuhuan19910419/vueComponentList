<template>
  <div class="grid-layout" :style="{ height: `${this.getTableHeight()}px` }">
    <el-table
      id="base-table-id"
      ref="baseTableRef"
      :data="tableData"
      :border="border"
      :height="getTableHeight()"
      :max-height="getMaxTableHeight()"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :header-cell-style="headerStyle"
      style="width: 100%"
      tooltip-effect="dark"
      @select="handleSelectionChange"
      @selection-change="handleSelectionChange2"
      @select-all="handleAllSelectionChange"
      v-bind="getTableProps"
    >
      <div slot="empty" style="background-color: transparent;"></div>
      <el-table-column
        v-if="getSelection"
        type="selection"
        :width="getWidth()"
        :selectable="selectInit"
      >
      </el-table-column>
      <el-table-column
        v-for="(item, columnIndex) in getAttrs()"
        :key="columnIndex.toString() + getUUID()"
        :label="$t(item.name)"
        v-bind="typeof item.columnPropsFun === 'function' ? item.columnPropsFun(columnIndex) : {}"
      >
        <template slot-scope="scope">
          <span
            v-if="item.type === getTableColumnType().normal"
            v-html="scope.row[item.attr]"
            @click="
              event => {
                handleVHtmlClick(item, event, scope, columnIndex)
              }
            "
          ></span>
          <span v-else-if="item.type === getTableColumnType().public && tableData.length > 0">
            <div
              v-if="typeof item.publicShowFun === 'function'"
              :style="
                subCellContainerStyle(
                  scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                  columnIndex,
                  item
                )
              "
            >
              <div
                style="margin-right: 10px;"
                v-for="(bItem, bIndex) in item.publicShowFun(
                  scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                  scope.row.srcObj
                )"
                :key="bIndex.toString() + getUUID()"
              >
                <el-button
                  v-if="!bItem.useIcon"
                  @click="handlePublicFunClick(bIndex, item, scope)"
                  v-bind="
                    typeof bItem.otherPropsFun === 'function'
                      ? bItem.otherPropsFun(
                          scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                          columnIndex,
                          bIndex,
                          scope.row
                        )
                      : {}
                  "
                  >{{ bItem.title }}</el-button
                >
                <el-button
                  v-else
                  @click="handlePublicFunClick(bIndex, item, scope)"
                  :class="bItem.title"
                  style="font-size: 20px;"
                  v-bind="
                    typeof bItem.otherPropsFun === 'function'
                      ? bItem.otherPropsFun(
                          scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                          columnIndex,
                          bIndex,
                          scope.row
                        )
                      : {}
                  "
                ></el-button>
              </div>
            </div>
          </span>
          <span v-else-if="item.type === getTableColumnType().numberInput && tableData.length > 0">
            <div
              :style="
                subCellContainerStyle(
                  scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                  columnIndex,
                  item
                )
              "
            >
              <el-input-number
                v-model="scope.row[item.attr]"
                v-bind="
                  typeof item.otherPropsFun === 'function'
                    ? item.otherPropsFun(
                        scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                        columnIndex,
                        0,
                        scope.row
                      )
                    : {}
                "
                @change="
                  content => {
                    handleInputFunClick(
                      content,
                      scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                      scope.row,
                      item
                    )
                  }
                "
              />
            </div>
          </span>
          <span v-else-if="item.type === getTableColumnType().select && tableData.length > 0">
            <div
              :style="
                subCellContainerStyle(
                  scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                  columnIndex,
                  item
                )
              "
            >
              <el-select
                v-model="scope.row[item.attr]"
                v-bind="
                  typeof item.otherPropsFun === 'function'
                    ? item.otherPropsFun(
                        scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                        columnIndex,
                        0,
                        scope.row
                      )
                    : {}
                "
                :placeholder="item.placeholder !== undefined ? item.placeholder : ''"
                @change="
                  content => {
                    handleInputFunClick(
                      content,
                      scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                      scope.row,
                      item
                    )
                  }
                "
              >
                <el-option
                  v-for="itemOption in item.options"
                  :key="itemOption.value"
                  :label="itemOption.label"
                  :value="itemOption.value"
                >
                </el-option>
              </el-select>
            </div>
          </span>
          <span v-else-if="item.type === getTableColumnType().input && tableData.length > 0">
            <div
              :style="
                subCellContainerStyle(
                  scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                  columnIndex,
                  item
                )
              "
            >
              <el-input
                v-model="scope.row[item.attr]"
                v-bind="
                  typeof item.otherPropsFun === 'function'
                    ? item.otherPropsFun(
                        scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                        columnIndex,
                        0,
                        scope.row
                      )
                    : {}
                "
                @change="
                  content => {
                    handleInputFunClick(
                      content,
                      scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                      scope.row,
                      item
                    )
                  }
                "
              />
            </div>
          </span>
          <span v-else-if="item.type === getTableColumnType().custom && tableData.length > 0">
            <div
              :style="
                subCellContainerStyle(
                  scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
                  columnIndex,
                  item
                )
              "
            >
              <slot
                name="customContent"
                :cellData="scope.row[item.attr]"
                :rowData="scope"
                :rowIndex="scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index"
                :columnIndex="columnIndex"
              ></slot>
            </div>
          </span>
          <span
            v-else
            v-html="scope.row[item.attr]"
            @click="
              event => {
                handleVHtmlClick(item, event, scope, columnIndex)
              }
            "
          ></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { uuid } from 'vue-uuid'
import tableColumnType from '@components/Common/BaseTable/type/tableColumnType'

// 在设置表格数据 changeObj 监听动态属性变化(双向绑定)，type === 3，4用到 {changeObj: {xx: ss}}

const initOperatingFun = () => {
  return [{ useIcon: true, title: 'el-icon-close' }]
}
export default {
  name: 'BaseTable',
  props: {
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
    // form-create  使用到参数value，disabled 一般是运行的值或显示的值 indexSNO 主要是序号，来标示第几行
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
    // 表头基础属性（name: 名称；attr：表格显示绑定属性；width：宽度；type: 参考tableColumnType.js, publicShowFun: this.getOperatingFun, publicClickFun: this.getPublicClickFun）
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
    // 数据唯一索引字段 (用于多选或者其它, 不要使用indexSNO主要是序号)
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
  data() {
    return {
      // let gridTitle = [
      //   {name: 'message.gridTitle.inventoryTime', attr: 'inventoryTime', width: '15%'},
      //   {name: 'message.gridTitle.operate', attr: 'operate', width: '10%', type: 2, publicShowFun: this.getOperatingFun, publicClickFun: this.getPublicClickFun}
      // ]
      tableData: [],
      attrs: [],
      tableObject: null
    }
  },
  model: {
    prop: 'tableObject',
    event: 'returnObjectBack'
  },
  filters: {},
  methods: {
    getWidth() {
      return '55'
    },
    getAttrs() {
      return this.attrs
    },
    getTableColumnType() {
      return tableColumnType
    },
    getUUID() {
      return uuid.v1()
    },
    getTableHeight() {
      if (this.height === -1) {
        return null
      } else {
        return this.height
      }
    },
    getMaxTableHeight() {
      if (this.maxHeight === -1) {
        return null
      } else {
        return this.maxHeight
      }
    },
    rowStyle({ row, rowIndex }) {
      return {
        color: '#484848',
        height: this.rowHeight + 'px'
      }
    },
    headerStyle({ row, column, rowIndex, columnIndex }) {
      return {
        color: '#484848',
        height: '35px',
        padding: '0px',
        background: '#DDE7F6'
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return {
        'padding-left': 0 + 'px',
        'padding-right': 0 + 'px',
        'padding-top': 2 + 'px',
        'padding-bottom': 2 + 'px'
      }
    },
    subCellContainerStyle(rowIndex, columnIndex, item) {
      if (item && typeof item.subCellContainerStyleFun === 'function') {
        return item.subCellContainerStyleFun(rowIndex, columnIndex, item)
      } else {
        return { display: 'flex', 'flex-wrap': 'wrap', 'flex-direction': 'row' }
      }
    },
    defaultSelectCheck() {
      let _that = this
      _that.$nextTick(() => {
        let tmpD = _that.tableData
        for (let tmpItem of tmpD) {
          if (tmpItem.checked !== undefined && tmpItem.checked === 1) {
            _that.$refs.baseTableRef.toggleRowSelection(tmpItem, true)
          }
        }
      })
    },
    selectInit(row, index) {
      if (row.checked === -1) {
        return false //不可勾选
      } else {
        return true //可勾选
      }
    },
    // 全选函数  点击全选遍历当页数据若无添加,若是反选则删除(判断是否是全选还是反选)
    handleSelectionChange(selection, row) {
      console.log('handleSelectionChange')
      for (let tI of this.tableData) {
        if (Object.prototype.hasOwnProperty.call(tI, 'checked') && tI.checked === 1) {
          tI.checked = 0
        }
      }

      for (let tSelectItem of selection) {
        if (
          Object.prototype.hasOwnProperty.call(tSelectItem, 'checked') &&
          tSelectItem.checked === 0
        ) {
          tSelectItem.checked = 1
        }
      }
      this.$emit('on-table-selection-change', false, selection, row)
      this.$emit('input', this.tableData)
    },

    handleSelectionChange2(selection) {
      console.log('handleSelectionChange2')
      // 全不选执行
      if (selection.length === 0) {
        let isSelectedFlag = 0
        for (let tI of this.tableData) {
          if (tI.checked !== -1) {
            tI.checked = isSelectedFlag
          }
        }

        this.$emit('on-table-selection-change', true, selection)
        this.$emit('input', this.tableData)
      }
    },
    handleAllSelectionChange(selection) {
      console.log('handleAllSelectionChange')
      let isSelectedFlag = selection.length === 0 ? 0 : 1
      for (let tI of this.tableData) {
        if (tI.checked !== -1) {
          tI.checked = isSelectedFlag
        }
      }

      this.$emit('on-table-selection-change', true, selection)
      this.$emit('input', this.tableData)
    },
    // 选中指定行数据数组 rowDatas [{indexSNO: 22}],必须包含indexSNO
    toggleSelection(rowDatas) {
      if (rowDatas) {
        for (let tmpI of rowDatas) {
          let tmpSelectData = this.tableData.find(item => {
            return (
              item.indexSNO !== undefined &&
              tmpI.indexSNO !== undefined &&
              item.indexSNO !== null &&
              tmpI.indexSNO !== null &&
              item.indexSNO === tmpI.indexSNO
            )
          })

          if (tmpSelectData) {
            this.$refs.baseTableRef.toggleRowSelection(tmpSelectData, true)
          }
        }
      }
    },
    // 全选
    toggleAllSelection() {
      this.$refs.baseTableRef.toggleAllSelection()
    },
    // 取消指定行数组
    cleanRowSelection(rowDatas) {
      if (rowDatas) {
        rowDatas.forEach(rowData => {
          this.$refs.baseTableRef.toggleRowSelection(rowData, false)
        })
      }
    },
    // 清空所以选中
    cleanAllSelection() {
      this.$refs.baseTableRef.clearSelection()
    },
    // form-create
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      if (this.value !== undefined && this.value !== null && Array.isArray(this.value)) {
        this.tableData = this.value
      } else {
        this.tableData = []
      }
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.tableData = val
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetAttrs(val, $f) {
      this.attrs = val
    },
    handleFunClick(row, actionIndex, attr) {
      this.$emit('on-operating-action', row, actionIndex, attr)
    },
    handlePublicFunClick(actionIndex, item, scope) {
      if (item !== undefined && typeof item.publicClickFun === 'function') {
        item.publicClickFun(
          scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
          actionIndex,
          item.attr,
          scope.row.srcObj
        )
      } else {
        this.$emit('on-operating-action', scope.row.indexSNO, actionIndex, item.attr)
      }
    },
    handleInputFunClick(content, indexSNO, rowData, item, tableDataIndex) {
      console.log('handleInputFunClick =' + content)
      if (item !== undefined && typeof item.changeValueFun === 'function') {
        item.changeValueFun(indexSNO, item, rowData.srcObj, this.tableData)
      }
      this.$emit('input', this.tableData)
    },
    /*
       * vhtml 点击事件，如果里面多个标签，请使用标签区别
       * test (event) {
           console.log(event.target.className) // testssss
           console.log(event.target.nodeName) // p
           if (event.target.nodeName === 'p' && event.target.className === 'testssss') {
             // 获取触发事件对象的属性
             alert('a')
           }
        }
       */
    handleVHtmlClick(item, event, scope, actionIndex) {
      if (item !== undefined && typeof item.handleVHtmlClick === 'function') {
        item.handleVHtmlClick(
          item,
          event,
          scope.row.indexSNO !== undefined ? scope.row.indexSNO : scope.$index,
          actionIndex
        )
      }
    }
  },
  beforeMount() {
    this.$emit('returnObjectBack', this)
  },
  mounted() {
    this.$emit('returnObjectBack', this)
    if (this.value !== undefined && this.value !== null && Array.isArray(this.value)) {
      this.tableData = this.value
    }

    if (this.baseAttrs !== undefined && this.baseAttrs !== null && Array.isArray(this.value)) {
      this.attrs = this.baseAttrs
    }

    if (this.selection) {
      this.defaultSelectCheck()
    }
  },
  computed: {
    getTableProps() {
      return this.tableProps
    },
    getSelection() {
      return this.selection
    }
  },
  watch: {
    value(to, from) {
      console.log('value')
      if (to !== undefined && to !== null && Array.isArray(to)) {
        this.tableData = to
      }
    },
    baseAttrs(to, from) {
      if (to !== undefined && to !== null && Array.isArray(to)) {
        this.attrs = to
      }
    }
  }
}
</script>

<style>
.grid-layout {
  font-size: 14px;
}

.el-table .cell {
  white-space: pre-line;
}

/*此样式不能修改，修改会导致show-overflow-tooltip 失效*/
/*.grid-layout .el-table .cell {*/
/*  white-space: pre-line;*/
/*}*/

.el-table::before {
  height: 0px;
}

.el-table__fixed::before {
  height: 0px;
}

.el-table-column--selection .cell {
  padding-left: 10px;
}
</style>

<!--test (event) {-->
<!--console.log(event.target.className) // testssss-->
<!--console.log(event.target.nodeName) // p-->
<!--if (event.target.nodeName === 'p' && event.target.className === 'testssss') {-->
<!--// 获取触发事件对象的属性-->
<!--alert('a')-->
<!--}-->
<!--}-->
