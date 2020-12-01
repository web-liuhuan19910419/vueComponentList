<template>
    <div :style="{height: `${imageHeight + 2 * 5}px`, display: 'flex'}">
      <div class="image-list-layout">
        <el-image v-for="(item, index) in showList" :key="index.toString()"
                  class="image-item-layout"
                  :style="{width: `${imageWidth}px`, height: `${imageHeight}px`}"
                  :src="item"
                  :preview-src-list="showList" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
    </div>
</template>

<script>
  import isTheOne from '@/utils/util/isTheOne'

  export default {
    name: 'RowShowPhotoListComponentV2',
    props: {
      title: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      titleLabelWidth: {
        type: String,
        default: '160'
      },
      isFitTitleWidthProp: {
        type: Boolean,
        default: false
      },
      imageWidth: {
        type: Number,
        default: 80
      },
      imageHeight: {
        type: Number,
        default: 80
      },
      tag: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        showList: !isTheOne.isUndefinedAndNull(this.value) ? this.value : []
      }
    },
    watch: {
      value (to, from) {
        if (!isTheOne.isUndefinedAndNull(to)) {
          this.showList = this.value
        } else {
          this.showList = []
        }
      }
    }
  }
</script>

<style scoped>

  .image-list-layout {
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }

  .image-item-layout {
    padding: 5px 0 5px 0;
    margin-right: 20px;
  }

  .el-image >>> .el-image-viewer__wrapper {
    color: white;
  }

</style>
