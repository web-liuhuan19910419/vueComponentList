<template>
  <div style="text-align: left" class="mini-dialog-content">
    <el-drawer
      :title="title"
      :visible.sync="visible"
      v-if="visible"
      direction="rtl"
      :before-close="handleClose"
      :close-on-press-escape="false"
      ref="sdrawer"
      size="369px">
      <div class="demo-drawer__content">
        <title-and-input-append-icon-component-v2
          style="margin-left: 30px"
          title-width="40px"
          inputWidth="270px"
          :title="findTitleProp"
          @input="searchAction"
          @input-change="searchAction"
        />
        <div style="font-size: 12px;margin-left: 30px;width: 320px;margin-top: 10px;height: 36px;background: #E9EBF0;display: flex;justify-content: space-between;align-items: center">
         <div style="display: flex;align-items: center">
           <el-checkbox style="margin-left: 13px;width: 35px" v-model="allChecked" @change="allCheckedChange"></el-checkbox>
           <p style="margin-left: 10px;color: #37383B">{{groupTilte}}</p>
         </div>
          <p style="margin-right: 15px">{{getShowSelectNumberLabel()}}</p>
        </div>
        <el-table
          ref="drawerMultipleTable"
          tooltip-effect="dark"
          :style="{width: '100%', 'margin-left': '30px', overflow: 'scroll'}"
          :data="gridData"
          :height="getTableHeight()"
          :show-header="false"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :selectable='selectInit'
            width="50">
          </el-table-column>
          <el-table-column
            :label="groupTilte"
            width="270">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="demo-drawer__footer" style="position: fixed;bottom: 0px;width: 100%; height: 50px;z-index: 8000;">
        <el-button type="primary" style="margin-left: 18px;width: 330px;margin-top: 10px" @click="okAction" >{{ '确 定' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import TitleAndInputAppendIconComponentV2 from '@/components2/TitleAndInputAppendIconComponentV2'
    export default {
      name: 'DrawerComponentV2',
      components: {
        TitleAndInputAppendIconComponentV2
      },
      props: {
        title: {
          type: String,
          default: ''
        },
        findTitleProp: {
          type: String,
          default: 'Find'
        },
        groupTilte: {
            type: String,
            default: ''
          },
        visibleProp: {
          type: Boolean,
          default: false
        },
        value: {
          type: Object,
          default: () => {
            return {
              selectList: [],
              list: []
            }
          }
        }
      },
      data () {
        return {
          gridData: this.value.list !== undefined ? this.value.list : [],
          visible: this.visibleProp !== undefined ? this.visibleProp : false,
          multipleSelection: this.value.selectList !== undefined ? this.value.selectList : [],
          allChecked: false,
          showSelectNumberLabel: '0/0'
        }
      },
      methods: {
        searchAction (content) {
          if (content.trim().length !== 0) {
            this.gridData = this.fuzzyQuery(this.value.list, content.trim())
          } else {
            this.gridData = this.value.list !== undefined ? this.value.list : []
          }
        },
        fuzzyQuery (list, keyWord) {
          let reg = new RegExp(keyWord)
          let arr = []
          for (let i = 0; i < list.length; i++) {
            if (reg.test(list[i].name)) {
              arr.push(list[i])
            }
          }
          return arr
        },
        getTableHeight () {
          let h = document.documentElement.clientHeight - 50 - 20 - 25 - 32 - 10 - 30 - 50
          return h
        },
        handleClose (done) {
          done()
          this.$emit('on-close', false, {data: []})
        },
        allCheckedChange (flag) {
          if (flag) {
            this.$refs.drawerMultipleTable.toggleAllSelection()
          } else {
            this.$refs.drawerMultipleTable.clearSelection()
          }
        },
        getShowSelectNumberLabel () {
          return this.multipleSelection.length + '/' + this.gridData.length
        },
        handleSelectionChange (val) {
          console.log('val =' + val)
          this.multipleSelection = val
          if (this.multipleSelection.length !== this.gridData.length) {
            this.allChecked = false
          } else {
            this.allChecked = true
          }
        },
        okAction () {
          this.$emit('on-close', true, {data: this.multipleSelection})
        },
        // handleDataSelectRow (selectList) {
        //   console.log('handleDataSelectRow =')
        //   for (let index = 0; index < selectList.length; index++) {
        //     let tmpSelectItem = selectList[index]
        //     this.$refs.drawerMultipleTable.toggleRowSelection(tmpSelectItem.sIndex, true)
        //   }
        // },
        defaultSelectCheck (tValue) {
          if (tValue !== undefined) {
            let _that = this
            _that.$nextTick(() => {
              _that.multipleSelection.forEach(rowData => {
                let tmpD = _that.gridData
                _that.$refs.drawerMultipleTable.toggleRowSelection(tmpD.find(item => {
                  return rowData.sIndex === item.sIndex // 注意这里寻找的字段要唯一
                }), true)
              })
            })
          }
        },
        selectInit (rowData, index) {
          if (rowData['uncheckFlag'] !== undefined && rowData['uncheckFlag'] === true) {
            return false
          } else {
            return true
          }
        }
      },
      mounted () {
        console.log('gridData =' + this.gridData)
        this.defaultSelectCheck(this.multipleSelection)
      },
      updated () {
      },
      watch: {
        visibleProp (to, from) {
          if (to !== undefined) {
            this.visible = to
          }
        },
        value: {
            handler (newValue, oldValue) {
              console.log(newValue)
              if (newValue !== undefined) {
                this.gridData = newValue.list !== undefined ? newValue.list : []
                if (newValue !== undefined && newValue.selectList !== undefined) {
                  this.multipleSelection = newValue.selectList
                  this.defaultSelectCheck(this.multipleSelection)
                }
              }
            },
            deep: true
        }
      }
    }
</script>

<style scoped>

  /deep/ :focus {
    outline: 0;
  }

</style>
