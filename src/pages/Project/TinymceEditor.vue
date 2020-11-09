<template>
  <div class='page-content-layout'>
    <h2 class="page-title-layout">{{$t('message.pageTitle.richText')}}</h2>
    <div class="page-new-content-layout">
      <tinymce-edit v-model="msg"
        :disabled="disabled"
        @onClick="onClick"
        ref="editor">
      </tinymce-edit>
    <button @click="clear">清空内容</button>
    <button @click="disabled = true">禁用</button>
    </div>
  </div>
</template>
<script>
import TinymceEdit from '@/components/TinymceEdit'
export default {
  components: {
    TinymceEdit
  },
  data () {
    return {
      msg: 'welcome to Tinymce Editor',
      disabled: false
    }
  },
  methods: {
    // 鼠标单击事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清除富文本的内容
    clear () {
     this.$refs.editor.clear()
    }
  }
}
</script>
<style scoped>
</style>