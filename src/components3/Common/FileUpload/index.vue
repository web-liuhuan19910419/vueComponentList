<template>
  <div class="upload-layout">
    <div class="upload-title-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
      <t-label
        :is-fit-title-width="getIsFitTitleWidth"
        :is-must="isMust"
        :title="getTitle"
        :is-show-title="isShowTitle"
        :show-title-width="showTitleWidth"
        :show-title-left="showTitleLeft"
      ></t-label>
    </div>
    <div class="upload-file-layout">
      <el-upload
        :action="this.getUpdateUrl()"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeAvatarUpload"
        :accept="accept"
        multiple
        :limit="this.limit"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :file-list="fileList"
      >
        <el-button>{{ this.chooseBtnTitle }}</el-button>
      </el-upload>
    </div>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import TLabel from '@/components3/Common/Label/TLabel'

export default {
  name: 'FileUpload',
  components: {
    ElImageViewer,
    TLabel
  },
  props: {
    // form-create  使用到参数value，disabled
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
    size: String,
    isMust: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    titleWidth: {
      type: Number,
      default: 160
    },
    isFitTitleWidth: {
      type: Boolean,
      default: false
    },
    // 是否显示标题
    isShowTitle: {
      type: Boolean,
      default: false
    },
    showTitleLeft: {
      type: Boolean,
      default: true
    },
    showTitleWidth: {
      type: Number,
      default: 170
    },
    limit: {
      type: Number,
      default: 9
    },
    // image/png,image/gif,image/jpeg,application/pdf (windows 用户可以改变选择文件类型)
    accept: {
      type: String,
      default: ''
    },
    chooseBtnTitle: {
      type: String,
      default: '选择照片'
    }
  },
  data() {
    return {
      url: '',
      fileList: this.value,
      showViewer: false,
      srcList: [],
      sucessFileList: []
    }
  },
  methods: {
    getUpdateUrl() {
      console.log(process.env)
      this.url = process.env.VUE_APP_UPLOAD_API
      console.log('1111' + this.url)
      return this.url
    },
    beforeAvatarUpload(file) {
      let flag = true
      // if (!(this.accept === null || this.accept === undefined || this.accept.length === 0 || this.accept.trim().length === 0)) {
      //   let fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
      //   let tIndex = this.accept.indexOf(fileName)
      //   if (tIndex === -1) {
      //     flag = false
      //   }
      // }
      return flag
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file)
      if (response !== undefined && response.result === '1') {
        let isSuccessFlag = true
        for (let tF of response.data) {
          if (tF.result === '0') {
            isSuccessFlag = false
            break
          }
        }
        if (response.data === undefined || response.data.length === 0) {
          isSuccessFlag = false
        } else {
          file.path = file.response.data[0].path
        }
        if (isSuccessFlag) {
          file.srcName = file.name
          if (file.name.length > 8) {
            let ext = ''
            let i = file.name.lastIndexOf('.')
            if (i >= 0) {
              ext = file.name.substr(i, file.name.length - i)
            }
            file.name = file.name.substr(0, 8) + '...' + ext
          }
          this.$emit('input', fileList)
        }
      } else {
        try {
          let fileIndex = fileList.indexOf(file)
          if (fileIndex >= 0) {
            fileList.splice(fileIndex, 1)
          }
        } catch (e) {
          console.log(e)
        }
        this.$message({
          type: 'error',
          message: JSON.stringify(response)
        })
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.$emit('input', fileList)
    },
    handlePreview(file) {
      this.showViewer = true
      if (file.raw !== undefined) {
        this.srcList = [URL.createObjectURL(file.raw)]
      } else {
        let imgD = new URL(file.url)
        this.srcList = [imgD]
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleChange(file, fileList) {
      console.log('handleChange =' + file)
    },
    closeViewer() {
      this.showViewer = false
    },
    // form-create
    // 表单禁用事件
    onDisabled(disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField() {
      this.fileList = this.value !== null && this.value !== undefined ? this.value : []
      this.sucessFileList = []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue(val, $f) {
      this.fileList = val
      this.sucessFileList = []
    }
  },
  computed: {
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    getTitle() {
      return this.title
    },
    getIsFitTitleWidth() {
      return this.isFitTitleWidth
    }
  },
  mounted() {
    this.fileList = this.value !== null && this.value !== undefined ? this.value : []
    // this.fileList = [
    //   {name: 'food_2.jpeg', path: 'test1', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
    //   {name: 'food_3.jpeg', path: 'test2', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
    //   {name: 'food2342_3.jpeg', path: 'test3', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    //   ]
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.upload-layout {
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  width: -moz-fit-content;
  align-items: flex-start;
}

.upload-title-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: $wms-color-text-primary;
}

.title-layout {
  line-height: 15px;
  height: 15px;
  text-align: left;
  margin-right: 10px;
  margin: 0 auto;
  width: auto;
  padding-top: 8px;
}
.title-width-fit-layout {
  width: fit-content;
  width: -moz-fit-content;
  margin: 0 auto;
  width: auto;
  overflow: visible;
  padding-top: 8px;
}

.upload-file-layout {
  display: flex;
  justify-content: flex-start;
}

.el-image-viewer__wrapper {
  color: white;
}
</style>
