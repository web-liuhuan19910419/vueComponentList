<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.cascader')}}</h2>
     <title-and-cascader :isShowTitle="true" title="下拉联动框" :options="options"></title-and-cascader>
  </div>
</template>

<script>
import titleAndCascader from '@/components3/Common/TitleAndCascader'
export default {
  components: {
    titleAndCascader
  },
  data () {
      return {
        options: [
          {label: '江西', value: '1', children:[{label: '南昌', value: '11'}, {label: '上饶', value: '12'}]},
          {label: '浙江', value: '2', children:[{label: '杭州', value: '21'}, {label: '宁波', value: '22'}]}
        ]
      }
  }
}
</script>

<style>

</style>