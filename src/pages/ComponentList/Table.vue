<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.table')}}</h2>
    <div style="display: flex; justify-content: space-between;">
        <select-check-all
        :title="getSelectTitle()"
        @input="checkedAll"
        :showTitleInline="false"
        ref="checkedAll"
       ></select-check-all>
         <page-switch
          :small="false"
          :pageCountProp="20"
          :currentPageProp="currentPage"
          :total-count-prop="totalCount"
          :totalPageCount="totalPageCount"
          layout="sizes, slot, prev, next, jumper"
          @on-page-size-change="handleSizeChange"
          @on-current-change="handleCurrentChange"
        ></page-switch>
    </div>
      <base-table
      style="margin-top：30px;"
      :rowHeight="50"
      ref="tabel"
      v-model="tableObject"
      :base-attrs="processGridTitle()"
      :value="processData()"
      :showBorderTop="true"
      :selection="true"
      @on-table-selection-change="onTableSelectChange"
    >
      </base-table>
  </div>
</template>

<script>
import titleAndInput from '@/components3/Common/TitleAndInputComponent'
import BaseTable from '@/components3/Common/BaseTable'
import SelectCheckAll from '@/components3/Common/SelectCheck'
import PageSwitch from '@/components3/Common/PageSwitch'
export default {
  name: 'Table',
  components: {
    BaseTable,
    SelectCheckAll,
    PageSwitch
  },
  data () {
      return {
        currentPage: 1,
        pageSize: 20,
        totalCount: 40,
        totalPageCount: 2,
        uniqueIndexKey: 'id',
        recordCheckedArr: [], // 缓存选中的
        tableObject: null,
        pageData: [ [
          {
            id: 1, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 2, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 3, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 4, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 5, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 6, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 7, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 8, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 9, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 10, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 11, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 12, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 13, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 14, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 15, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 16, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 17, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 18, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 19, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 20, name: 'liuhuan', job: '老师', money: 1000
          }
        ],  [
          {
            id: 21, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 22, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 23, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 24, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 25, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 26, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 27, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 28, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 29, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 30, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 31, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 32, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 33, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 34, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 35, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 36, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 37, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 38, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 39, name: 'liuhuan', job: '老师', money: 1000
          },
           {
            id: 40, name: 'liuhuan', job: '老师', money: 1000
          }
        ]],
        responseData: [
        ]
      }
  },
  mounted () {
    this.responseData = JSON.parse(JSON.stringify(this.pageData[this.currentPage - 1]))
    this.checkSetInit()
  },
  methods: {
     handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.responseData = JSON.parse(JSON.stringify(this.pageData[this.currentPage - 1]))
      this.checkSetInit()
    },
    // 处理全选相关函数
    getSelectTitle () {
      return '已选' + this.recordCheckedArr.length
    },
     checkSetInit() {
      this.responseData.map(v => {
        let flag = this.$lodash.findIndex(this.recordCheckedArr, o => {
          return v[this.uniqueIndexKey] === o[this.uniqueIndexKey]
        })
        console.log('当前选中的下标是' + flag)
        if (flag !== -1) {
          // 原来有勾选过
          v.checked = 1
        } else {
          // 原来没有勾选过
          v.checked = 0
        }
      })
      console.log(this.responseData)
      if (this.responseData.length !== 0) {
        let flag = this.$lodash.findIndex(this.responseData, o => {
          return o.checked === 0
        })
        console.log(flag)
        if (flag === -1) {
          // 没有找到 未选的
          this.$refs.checkedAll.checked = true
        } else {
          this.$refs.checkedAll.checked = false
        }
      } else {
        this.$refs.checkedAll.checked = false
      }
    },
    checkedAll(val) {
      console.log('操作了全选函数')
      if (val) {
        // 全部多选
        this.responseData.map(v => {
          v.checked = 1
        })
        this.tableObject.toggleAllSelection()
      } else {
        // 清除多选
        this.responseData.map(v => {
          v.checked = 0
        })
        this.tableObject.cleanAllSelection()
        this.onRememberCheckedALL([])
        console.log(this.recordCheckedArr)
      }
    },
    onTableSelectChange(content, selectData, row) {
      // 单选函数
      console.log(content)
      console.log(selectData)
      console.log(row)
      if (!content) {
        // 如果点击的是表格内的单选操作
        let index = this.$lodash.findIndex(this.responseData, o => {
          return o[this.uniqueIndexKey] === row[this.uniqueIndexKey]
        })
        this.responseData[index].checked = row.checked
        let flag = this.$lodash.findIndex(this.responseData, o => {
          return o.checked === 0
        })
        if (flag === -1) {
          // 没有找到 未选的
          this.$refs.checkedAll.checked = true
        } else {
          this.$refs.checkedAll.checked = false
        }
        let currentRow = row
        this.onFindAndRecordChecked(currentRow)
      } else {
        // 点击表格内的全选操作
        if (selectData.length === 0) {
          this.$refs.checkedAll.checked = false
          this.responseData.map(v => {
            v.checked = 0
          })
        } else {
          this.$refs.checkedAll.checked = true
          this.responseData.map(v => {
            v.checked = 1
          })
        }
        this.onRememberCheckedALL(selectData)
      }
      console.log(this.recordCheckedArr)
    },
    onRememberCheckedALL(selectData) {
      let currentSelectData = []
      if (selectData.length === 0) {
        // 全不选状态
        for (let item of this.$refs.tabel.tableData) {
          if (item.checked !== -1) {
            // 不是禁选的
            item.checked = 0
            currentSelectData.push(item)
          }
        }
      } else {
        // 全选状态
        currentSelectData = selectData
      }
      console.log(currentSelectData)
      for (let index = 0; index < currentSelectData.length; index++) {
        let currentRow = currentSelectData[index]
        this.onFindAndRecordChecked(currentRow)
      }
    },
    onFindAndRecordChecked(currentRow) {
      // 查找表格内部是不是已经有选中的
      let flag = this.$lodash.findIndex(this.recordCheckedArr, o => {
        return o[this.uniqueIndexKey] === currentRow[this.uniqueIndexKey]
      })
      if (currentRow.checked === 1) {
        // 如果当前行是选中
        if (flag === -1) {
          // 如果原来没有选中过
          this.recordCheckedArr.push(currentRow)
        }
      } else {
        // 当前行是清空选中
        if (flag !== -1) {
          // 如果原来有存储，就删除掉这个
          console.log('执行了删除函数')
          this.recordCheckedArr.splice(flag, 1)
        }
      }
      console.log(this.recordCheckedArr)
    },
     processGridTitle() {
      let gridTitle = [
        {
          name: 'id',
          attr: 'id',
          columnPropsFun: index => {
            return {
              'min-width': '5%'
            }
          }
        },
        {
          name: '姓名',
          attr: 'name',
          columnPropsFun: index => {
            return {
              'min-width': '10%'
            }
          }
        },
        {
          name: '职业',
          attr: 'job',
          columnPropsFun: index => {
            return {
              'min-width': '10%'
            }
          }
        },
        {
          name: '收入',
          attr: 'money',
          columnPropsFun: index => {
            return {
              'min-width': '10%'
            }
          }
        },
        {
          name: '操作',
          attr: 'operation',
          columnPropsFun: index => {
            return {
              'min-width': '20%'
            }
          },
          type: 7,
          dropdownCutCount: 3,
          publicShowFun: this.publicShowFun,
          changeValueFun: this.publicClickFun,
          publicClickFun: this.publicClickFun
        }
      ]
      return gridTitle
    },
      publicShowFun() {
      return [
        {
          useIcon: false,
          title: 'add',
          otherPropsFun: () => {
            return { type: 'plain' }
          }
        },
        {
          useIcon: false,
          title: 'delete',
          otherPropsFun: () => {
            return { type: 'danger' }
          }
        }
      ]
    },
     publicClickFun(indexSNO, actionIndex) {
      console.log(indexSNO, actionIndex)
    },
    processData() {
      console.log('执行表格数据')
      let gridData = []
      for (let item of this.responseData) {
        let element = {
          id: item.id,
          name: item.name,
          job: item.job,
          money: item.money,
          operation: '',
          checked: item.checked
        }
        gridData.push(element)
      }
      return gridData
    },
    processType(type) {
      if (type === '0') {
        return this.$t('message.content.normal')
      } else if (type === '1') {
        return this.$t('message.content.assemble')
      } else if (type === '2') {
        return this.$t('message.content.problem')
      } else if (type === '3') {
        return this.$t('message.content.bind')
      }
    }
  }
}
</script>

<style>

</style>