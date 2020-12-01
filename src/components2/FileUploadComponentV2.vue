<template>
 <div class="upload-layout">
   <div class="must-title-layout">
     <p v-if="!isFitWidthProp" class="title-layout"
        :style="{'width': `${this.titleWidth}px`}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{ title }}</p>
     <p v-else class="title-layout"
        :class="[{'title-width-fit-layout' : isFitWidthProp}]"><span v-if="isMustProp" class="must-flag-layout">*</span>{{ title }}</p>
   </div>
   <div>
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
       :file-list="fileList">
       <el-button>{{this.chooseBtnTitle}}</el-button>
     </el-upload>
   </div>
   <el-image-viewer
   v-if="showViewer"
   :on-close="closeViewer"
   :url-list="srcList" />
 </div>
</template>

<script>
  import Vue from 'vue'
  import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

  export default {
    name: 'FileUploadComponentV2',
    components: {
      ElImageViewer
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
      isMustProp: {
        type: Boolean,
        default: false
      },
      title: '',
      titleWidth: {
        type: Number,
        default: 160
      },
      isFitWidthProp: {
        type: Boolean,
        default: false
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
    data () {
      return {
        url: '',
        fileList: this.value,
        showViewer: false,
        srcList: [],
        sucessFileList: []
      }
    },
    methods: {
      getUpdateUrl () {
        this.url = Vue.prototype.$sglobal.getUploadAPI2()
        return this.url
      },
      beforeAvatarUpload (file) {
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
      handleSuccess (response, file, fileList) {
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
          }
          if (isSuccessFlag) {
            file.srcName = file.name
            if (file.name.length > 16) {
              let ext = ''
              let i = file.name.lastIndexOf('.')
              if (i >= 0) {
                ext = file.name.substr(i, file.name.length - i)
              }
              file.name = file.name.substr(0, 16) + '...' + ext
            }
            this.sucessFileList.push(file)
            this.$emit('input', this.sucessFileList)
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
          this.$toast('文件上传失败 = ' + JSON.stringify(response))
        }
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        let delIndex = -1
        for (let i = 0; i < this.sucessFileList.length; i++) {
          let item = this.sucessFileList[i]
          if (file.response.data !== undefined && item.response.data[0].path === file.response.data[0].path) {
            delIndex = i
            break
          }
        }
        if (delIndex >= 0) {
          this.sucessFileList.splice(delIndex, 1)
          this.$emit('input', this.sucessFileList)
        }
      },
      handlePreview (file) {
        this.showViewer = true
        this.srcList = [URL.createObjectURL(file.raw)]
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleChange (file, fileList) {
      },
      closeViewer () {
        this.showViewer = false
      },
      // form-create
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.fileList = (this.value !== null && this.value !== undefined) ? this.value : []
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.fileList = val
      }
    },
    mounted () {
      this.fileList = (this.value !== null && this.value !== undefined) ? this.value : []
    }
  }
</script>

<style scoped>

  .upload-layout {
    display: flex;
    justify-content: flex-start;
    width:fit-content;
    width:-moz-fit-content;
  }

  .must-title-layout {
    display: flex;
    justify-content: flex-start;
  }

  .title-layout {
    font-size: 14px;
    color: #484848;
    line-height: 20px;
    height: 35px;
    width: 120px;
    text-align: left;
    margin-right: 10px;
  }

  .title-width-fit-layout {
    width:fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
    width:auto;
    overflow:visible;
  }

  .el-image-viewer__wrapper {
    color: white;
  }

</style>
