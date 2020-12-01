<template>
  <div class="grid-layout">
    <el-table
      :data="tableData"
      border
      height="100%"
      :row-style="rowStyle"
      :cell-style="{padding:5+'px'}"
      :header-cell-style="headerStyle"
      style="width: 100%" >
      <el-table-column v-for="(item, index) in attrs" :key="index" fixed :label="$t(item.name)" :min-width="item.width" height="35px">
        <template slot-scope="scope">
          <div v-html="scope.row[item.attr]"></div>
        </template>
      </el-table-column>
      <el-table-column v-if="isShowOperating"
        fixed="right"
        :label="operatingTitle"
        :width="operatingWidth">
        <template slot-scope="scope">
          <div v-for="(item, index) in operatingFun(scope.row)" :key="index.toString()">
            <el-button v-if="!item.useIcon" @click="handleFunClick(scope.$index, index)" type="text">{{item.title}}</el-button>
            <el-button v-else @click="handleFunClick(scope.$index, index)" :class="item.title" style="font-size: 20px;" type="text"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  const initOperatingFun = () => {
    return [{useIcon: true, title: 'el-icon-close'}]
  }
  export default {
    name: 'MutiLangBaseGridComponent3V2',
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
      // 表头基础属性（name: 名称；prod：表格显示绑定属性；width：宽度；）
      baseAttrs: Array,
      isShowOperating: {
        type: Boolean,
        default: false
      },
      operatingTitle: {
        type: String,
        default: ''
      },
      operatingWidth: {
        type: Number,
        default: 50
      },
      operatingFun: {
        type: Function,
        default: () => {
          return initOperatingFun()
        }
      }
    },
    data () {
      return {
        currentClickRow: -1,
        tableData: [],
        attrs: []
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
        return 'color:#484848;height:35px;Fpadding:0px;background:#DDE7F6;'
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
      handleFunClick (row, actionIndex) {
        this.$emit('on-operating-action', row, actionIndex)
      }
    },
    mounted () {
      if (this.value !== undefined && this.value !== null && Array.isArray(this.value)) {
        this.tableData = this.value
      }

      if (this.baseAttrs !== undefined && this.baseAttrs !== null && Array.isArray(this.value)) {
        this.attrs = this.baseAttrs
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

</style>
