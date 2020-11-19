<template>
  <div class='page-content-layout'>
     <h2 class="page-title-layout">{{$t('message.pageTitle.baseComponent')}}</h2>
     <radio-component
      title="地址"
      :isMustProp="true"
      :radioOptions="radioOptions"></radio-component>
  </div>
</template>

<script>
import RadioComponent from '@/components/RadioComponent'
export default {
  name: 'ComponentList',  
  components: {
    RadioComponent
  },
  data () {
    return {
      radioOptions: [
        {name: '江西', value: '1'},
        {name: '湖南', value: '0'},
        {name: '杭州', value: '2'}
      ]
    }
  }
}
</script>

<style>

</style>