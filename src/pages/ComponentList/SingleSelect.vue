<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.singleSelect')}}</h2>
    <title-and-single-select title="单选下拉框" :options="options" :isShowTitle="true"></title-and-single-select>  
  </div>
</template>

<script>
import titleAndSingleSelect from '@/components3/Common/TitleAndSingleSelect'
export default {
  components: {titleAndSingleSelect},
  data () {
      return {
        options: [{
          label: '选项1', value:'0'
        },{
          label: '选项2', value: '1', disabled: true
        },
        {
          label: '选项3', value:'3'
        }]
      }
  }
}
</script>

<style>

</style>