<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.DatePicker')}}</h2>
     <title-and-date-picker title="日期选择"></title-and-date-picker>
       <title-and-date-range-picker title="日期范围选择"></title-and-date-range-picker>
  </div>
</template>

<script>
import TitleAndDatePicker from '@/components3/Common/TitleAndDatePicker'
import TitleAndDateRangePicker from '@/components3/Common/TitleAndDateRangePicker'
export default {
  components: {
    TitleAndDateRangePicker,
    TitleAndDatePicker},
  data () {
      return {}
  }
}
</script>

<style>

</style>