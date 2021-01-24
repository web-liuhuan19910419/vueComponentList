<template>
  <div v-if="getAttrObject && getScope">
    <div
      v-if="getDropdownCutFlag"
      :style="
        getAttrObject.subCellContainerStyle
          ? getAttrObject.subCellContainerStyle(
              getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
              getColumnIndex,
              getAttrObject
            )
          : {}
      "
    >
      <el-dropdown
        split-button
        @click="
          () => {
            dropdownClick(
              getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
              getColumnIndex,
              getAttrObject,
              getScope.row
            )
          }
        "
        @command="
          content => {
            commandClick(
              getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
              getColumnIndex,
              content,
              getAttrObject,
              getScope.row
            )
          }
        "
        v-bind="
          typeof getAttrObject.otherPropsFun === 'function'
            ? getAttrObject.otherPropsFun(
                getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
                getColumnIndex,
                0,
                getScope.row
              )
            : { type: 'primary' }
        "
      >
        {{
          getScope.row[getAttrObject.attr] !== undefined
            ? getScope.row[getAttrObject.attr]
            : getAttrObject.placeholder
            ? getAttrObject.placeholder
            : getAttrObject.options.length > 0
            ? getAttrObject.options[0].title
            : 'Please Select'
        }}
        <el-dropdown-menu v-if="getAttrObject.publicShowFun" slot="dropdown">
          <el-dropdown-item
            v-for="itemOption in getAttrObject.publicShowFun(
              getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
              getScope.row.srcObj
            )"
            :key="itemOption.title"
            :command="itemOption.value ? itemOption.value : itemOption.title"
            :disabled="itemOption.disabled"
            :divided="itemOption.divided"
            :icon="itemOption.icon"
            >{{ itemOption.title }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div
      v-else-if="getAttrObject.publicShowFun"
      style="display:flex;flex-wrap: wrap; flex-direction: row "
    >
      <div
        style="margin-right: 10px;}"
        v-for="(bItem, bIndex) in getAttrObject.publicShowFun(
          getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
          getScope.row.srcObj
        )"
        :key="bIndex.toString() + getUUID()"
      >
        <el-button
          v-if="!bItem.useIcon"
          @click="handlePublicFunClick(bIndex, getAttrObject, getScope)"
          v-bind="
            typeof bItem.otherPropsFun === 'function'
              ? bItem.otherPropsFun(
                  getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
                  getColumnIndex,
                  bIndex,
                  getScope.row
                )
              : {}
          "
          >{{ bItem.title }}</el-button
        >
        <el-button
          v-else
          @click="handlePublicFunClick(bIndex, getAttrObject, getScope)"
          :class="bItem.title"
          style="font-size: 20px;"
          v-bind="
            typeof bItem.otherPropsFun === 'function'
              ? bItem.otherPropsFun(
                  getScope.row.indexSNO !== undefined ? getScope.row.indexSNO : getScope.$index,
                  getColumnIndex,
                  bIndex,
                  getScope.row
                )
              : {}
          "
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'

export default {
  name: 'AutoDropdown',
  props: {
    attrObject: Object,
    scope: Object,
    columnIndex: {
      type: Number,
      default: -1
    },
    isDropdownCutFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getUUID() {
      return uuid.v1()
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
    subCellContainerStyle(
      rowIndex,
      columnIndex,
      item,
      defaultStyle = { display: 'flex', 'flex-wrap': 'wrap', 'flex-direction': 'row' }
    ) {
      if (item && typeof item.subCellContainerStyleFun === 'function') {
        return item.subCellContainerStyleFun(rowIndex, columnIndex, item)
      } else {
        return defaultStyle
      }
    },
    dropdownClick(indexSNO, columnIndex, item, row) {
      this.$emit('dropdown-click', indexSNO, columnIndex, item, row)
    },
    commandClick(indexSNO, columnIndex, content, item, row) {
      this.$emit('command-change', indexSNO, columnIndex, content, item, row)
    }
  },
  computed: {
    getAttrObject() {
      return this.attrObject
    },
    getScope() {
      return this.scope
    },
    getColumnIndex() {
      return this.columnIndex
    },
    getDropdownCutFlag() {
      return this.isDropdownCutFlag
    }
  }
}
</script>

<style scoped></style>
