<template>
  <div class="grid-layout">
    <el-table
      ref="multipleTable"
      :data="showValue"
      border
      height="100%"
      tooltip-effect="dark"
      :row-style="rowStyle"
      :cell-style="{padding:5+'px'}"
      :header-cell-style="headerStyle"
      style="width: 100%">
      <el-table-column label="选择" width="65">
        <template slot-scope="scope">
          <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in attrs" :key="index" :label="$t(item.name)" :min-width="item.width" height="35px" >
        <template slot-scope="scope">
          <div v-html="scope.row[item.attr]" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'SingleBaseGridComponentV2',
    props: {
      // form-create  使用到参数value，disabled
      value: {
        type: Object,
        default: () => {
          return {}
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 表头基础属性（name: 名称；prod：表格显示绑定属性；width：宽度；）
      baseAttrs: Array
    },
    data () {
      return {
        radio: '',
        currentClickRow: -1,
        attrs: (this.baseAttrs === undefined || this.baseAttrs === null) ? [] : this.baseAttrs,
        showValue: (this.options === undefined || this.options === null) ? [] : this.options
      }
    },
    computed: {
    },
    filters: {
    },
    methods: {
      rowStyle ({row, rowIndex}) {
        return 'color:#D0D0D0;height:30px;background:green;'
      },
      headerStyle ({row, column, rowIndex, columnIndex}) {
        return 'color:#484848;height:35px;padding:0px;background:#DDE7F6;'
      },
      getCurrentRow (row) {
        // 获取选中数据this.templateSelection = row;
        this.$emit('on-select-item', {row: row, data: this.options[row]})
        this.$emit('input', {row: row, data: this.options[row]})
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
        this.value = val
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetShowValue (val) {
        this.showValue = val
      },
      onSetBaseAttrs (val) {
        this.attrs = val
      }
    }
  }
</script>

<style scoped>

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
