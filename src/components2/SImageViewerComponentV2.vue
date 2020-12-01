<template>
  <div>
    <el-image-viewer
    v-if="showViewer"
    :on-close="closeViewer"
    :url-list="urlList" />
  </div>
</template>

<script>
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

  export default {
    name: 'SImageViewerComponentV2',
    components: {
      ElImageViewer
    },
    props: {
      showViewerProp: {
        type: Boolean,
        default: false
      },
      urlListProp: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        showViewer: (this.showViewerProp !== undefined && this.showViewerProp !== null) ? this.showViewerProp : false,
        urlList: (this.urlListProp !== undefined && this.urlListProp !== null) ? this.urlListProp : []
      }
    },
    methods: {
      closeViewer () {
        this.showViewer = false
        this.$emit('on-close', false)
      }
    },
    watch: {
      showViewerProp (to, from) {
        if (to !== undefined && to !== null) {
          this.showViewer = to
        } else {
          this.showViewer = false
        }
      },
      urlListProp (to, from) {
        if (to !== undefined && to !== null) {
          this.urlList = to
        } else {
          this.urlList = []
        }
      }
     }
  }
</script>

<style scoped>

  .el-image-viewer__wrapper {
    color: white;
  }

</style>
