<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.pageSwich')}}</h2>
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
</template>

<script>
import pageSwitch from '@/components3/Common/PageSwitch'
export default {
  components: {
    pageSwitch
  },
  data () {
      return {
        currentPage: 1,
        pageSize: 20,
        totalCount: 200,
        totalPageCount: 10
      }
  }
}
</script>

<style>

</style>