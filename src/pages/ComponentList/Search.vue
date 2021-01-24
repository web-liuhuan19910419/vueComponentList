<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.search')}}</h2>
      <title-and-select-and-input-search
        placeholder="请输入内容"
          :value="searchValue"
          v-model="searchValue"
          :searchOptions="searchOptions"
          @input="onSearchAction"
        ></title-and-select-and-input-search>
  </div>
</template>

<script>
import titleAndSelectAndInputSearch from '@/components3/Common/TitleAndSelectAndInputSearch'
export default {
  components: {titleAndSelectAndInputSearch},
  data () {
      return {
        searchValue: {
        selectOption: '1',
        searchContent: ''
      },
      searchOptions: [
        { label: '姓名', value: '1' },
        { label: '年龄', value: '2' }
      ],
      }
  }
}
</script>

<style>

</style>