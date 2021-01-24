/** * 在内容Foot中，显示的页面切换组件 */
<template>
  <div class="page-switch-layout">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @next-click="onGotoNextPage"
      @prev-click="onGotoLastPage"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageCount"
      :layout="getLayout"
      :total="totalCount"
      :small="getSmall"
      :popper-class="getPopperClass"
      :disabled="getDisabled"
      :hide-on-single-page="getHideOnSinglePage"
      on
    >
      <span class="pagination-slot-layout">{{ this.currentPage }}/{{ this.totalPageCount }}</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PageSwitch',
  props: {
    currentPageProp: {
      type: Number,
      default: 0
    },
    pageCountProp: {
      type: Number,
      default: 20
    },
    totalCountProp: {
      type: Number,
      default: 0
    },
    totalPageCount: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50, 100]
      }
    },
    // 小组件 只支持layout: prev, pager, next, jumper
    small: {
      type: Boolean,
      default: false
    },
    background: Boolean,
    layout: {
      default: 'total, slot, sizes, prev, pager, next, jumper'
    },
    popperClass: String,
    disabled: Boolean,
    hideOnSinglePage: Boolean
  },
  data() {
    return {
      currentPage: 0,
      pageCount: 20,
      totalCount: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('on-page-size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('on-current-change', val)
    },
    onGotoFirstPage() {
      this.$emit('on-first-page')
    },
    onGotoLastPage() {
      this.$emit('on-last-page')
    },
    onGotoNextPage() {
      this.$emit('on-next-page')
    }
  },
  beforeMount() {
    if (this.currentPageProp !== undefined) {
      this.currentPage = this.currentPageProp
    }
    if (this.pageCountProp !== undefined) {
      this.pageCount = this.pageCountProp
    }
    if (this.totalCountProp !== undefined) {
      this.totalCount = this.totalCountProp
    }
  },
  computed: {
    getSmall() {
      return this.small
    },
    getLayout() {
      return this.layout
    },
    getPopperClass() {
      return this.popperClass
    },
    getDisabled() {
      return this.disabled
    },
    getHideOnSinglePage() {
      return this.hideOnSinglePage
    }
  },
  watch: {
    pageCountProp(to, from) {
      if (to !== undefined) {
        this.pageCount = to
      }
    },
    currentPageProp(to, from) {
      if (to !== undefined) {
        this.currentPage = to
      }
    },
    totalCountProp(to, from) {
      if (to !== undefined) {
        this.totalCount = to
      }
    }
  }
}
</script>

<style scoped>
.page-switch-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  float: right;
}

.pagination-slot-layout {
  font-weight: normal;
}
.page-switch-layout >>> .el-pagination {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.page-switch-layout >>> .el-pagination__jump {
  margin-left: 10px !important;
}
.page-switch-layout >>> .btn-prev {
  padding-right: 0 !important;
}
.page-switch-layout >>> .btn-next {
  padding-left: 0 !important;
}
.page-switch-layout >>> .el-pagination button {
  padding: 0 !important;
}
</style>
