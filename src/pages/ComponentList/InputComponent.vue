<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.input')}}</h2>
     <title-and-input title="普通text输入框" v-model="inputValue" :value="inputValue" titleWidth="120px" placeholder="请输入内容"></title-and-input>
     <title-and-input type="textarea" title="普通textArean输入框" v-model="inputTextValue" :value="inputTextValue" titleWidth="120px" placeholder="请输入内容" :minRows="4" :maxRows="6"></title-and-input>
     <title-and-input-number  titleWidth="120px" title="数字输入框"></title-and-input-number>
  </div>
</template>

<script>
import titleAndInput from '@/components3/Common/TitleAndInputComponent'
import titleAndInputNumber from '@/components3/Common/TitleAndInputNumber' 
export default {
  components: {
    titleAndInputNumber,
    titleAndInput
  },
  data () {
      return {
        inputValue: '',
        inputTextValue: ''
      }
  }
}
</script>

<style>

</style>