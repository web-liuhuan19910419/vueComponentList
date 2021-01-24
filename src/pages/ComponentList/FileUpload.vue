<template>
  <div class="page-content-layout">
    <h2 class="page-title-layout">{{$t('message.pageTitle.fileUpload')}}</h2>
     <file-upload title="文件上传" :isShowTitle="true"></file-upload>
  </div>
</template>

<script>
import fileUpload from '@/components3/Common/FileUpload'
export default {
  components: {fileUpload},
  data () {
      return {}
  }
}
</script>

<style>

</style>