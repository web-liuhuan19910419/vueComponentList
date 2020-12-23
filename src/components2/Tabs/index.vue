<template>
  <el-tabs
    v-model="tabIndex"
    @tab-click="tabClick"
    @tab-remove="tabRemove"
    @tab-add="tabAdd"
    @edit="edit"
    v-bind="getTabProps"
  >
    <el-tab-pane
      :key="item.name + index"
      v-for="(item, index) in tableTabs"
      :label="item.title"
      :name="item.name"
      :disabled="item.disabled"
      :closable="item.closable"
      :lazy="item.lazy"
    >
      <span
        v-if="item.custom !== undefined && item.custom"
        slot="customLabel"
        :index="index"
        :item="item"
      ></span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    //	card/border-card
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectTapValue: {
      type: String,
      default: '0'
    },
    editable: Boolean,
    // top/right/bottom/left
    tabPosition: {
      type: String,
      default: 'top'
    },
    beforeLeave: Function,
    stretch: Boolean
  },
  data() {
    return {
      // {
      //     title: 'Tab 1',
      //         name: '1',
      //     content: 'Tab 1 content',
      //   custom: false
      //     props: {}
      // }
      tableTabs: this.value !== undefined ? this.value : [],
      // name
      tabIndex: '1'
    }
  },
  methods: {
    tabClick(object) {
      this.$emit('tab-click', object)
    },
    tabRemove(name) {
      this.removeTab(name)
      this.$emit('tab-remove', name)
    },
    tabAdd() {
      this.$emit('tab-add')
    },
    edit(targetName, action) {
      this.$emit('edit', targetName, action)
    },
    // targetName: 显示，name： 数据处理（唯一）
    addTab(targetName, name, content) {
      this.tableTabs.push({
        title: targetName,
        name: name,
        content: content,
        custom: false,
        props: {}
      })

      this.$emit('input', this.tableTabs)
    },
    removeTab(name) {
      let tabs = this.tableTabs
      this.tableTabs = tabs.filter(tab => tab.name !== name)
      this.$emit('input', this.tableTabs)
    }
  },
  computed: {
    getTabProps() {
      return {
        type: this.type,
        activeName: this.activeName,
        closable: this.closable,
        addable: this.addable,
        value: this.value,
        editable: this.editable,
        tabPosition: this.tabPosition,
        beforeLeave: this.beforeLeave,
        stretch: this.stretch
      }
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.tableTabs = to
      }
    }
  }
}
</script>

<style scoped></style>
