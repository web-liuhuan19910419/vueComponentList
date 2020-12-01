<template>
  <div class="title-input-layout">
    <p v-if='!isFitWidth' class="title-layout" :style="{'width': titleWidth}"> <span v-if="isMust" class="must-flag-layout">*</span> {{ $t(title) }}</p>
    <p v-else class="title-layout title-width-fit-layout"> <span v-if="isMust" class="must-flag-layout">*</span> {{ $t(title) }}</p>
    <el-input
      v-model="inputContent"
      :placeholder="this.placeholder"
      type="text"
      :maxlength="maxlength !== -1 ? maxlength : -1"
      :minlength="minlength !== -1 ? minlength : -1"
      :clearable="true"
      :style="{'width':inputWidth}"
      @input="e => inputContentChange(e)">
      <el-button slot="append" icon="el-icon-search"></el-button></el-input>
  </div>
</template>

<script>
import isTheOne from '@/utils/util/isTheOne'

export default {
  name: 'TitleAndInputAppendIconComponentV2',
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    titleWidth: {
      type: String,
      default: '70px'
    },
    inputWidth: {
      type: String,
      default: '200px'
    },
    isMust: {
      type: Boolean,
      default: false
    },
    isFitWidth: {
      type: Boolean,
      default: false
    },
    minlength: {
      type: Number,
      default: -1
    },
    maxlength: {
      type: Number,
      default: -1
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: Number,
      default: -1
    },
    appendTitle: {
      type: String,
      default: 'el-icon-search'
    }
  },
  data () {
    return {
      inputContent: (this.value !== undefined && this.value !== null) ? this.value : ''
    }
  },
  methods: {
    appendAction () {
      this.inputContent = this.inputContent.trim()
      this.$emit('input', this.inputContent)
      this.$emit('append-click', this.inputContent)
    },
    inputContentChange (content) {
      this.inputContent = this.inputContent.trim()
      this.$emit('input', this.inputContent)
    },
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.inputContent = (this.value !== null && this.value !== undefined) ? this.value : ''
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.inputContent = val
    }
  },
  computed: {
    getAppendTitle () {
      return this.appendTitle
    }
  },
  watch: {
    value (to, from) {
      if (!isTheOne.isUndefinedAndNull(to)) {
        this.inputContent = to
      } else {
        this.inputContent = ''
      }
    }
  }
}
</script>

<style scoped>
  .title-input-layout {
    display: flex;
    justify-content: flex-start;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .title-layout {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
    text-align: left;
    white-space:nowrap;
    padding: 0 10px 0 0;
  }

  .title-width-fit-layout {
    width:fit-content;
    width:-moz-fit-content;
    margin: 0 auto;
    width:auto;
    overflow:visible;
  }

  .must-flag-layout {
    color: #E53646;
  }

</style>
