<template>
  <div class='tinymce'>
    <editor v-model="myValue"
      :init="init">
    </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/skins/lightgray/skin.min.css'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: '请输入内容'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table textcolor wordcount contextmenu'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data () {
    return {
      init: {
        language_url: '/public/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/public/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      },
      myValue: this.value
    }
  },
  mounted () {
    console.log('初始挂载')
    tinymce.init({})
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    clear () {
      this.myValue = ''
    }
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newMyValue) {
      this.$emit('input', newMyValue)
    }
  }
}
</script>

<style>

</style>