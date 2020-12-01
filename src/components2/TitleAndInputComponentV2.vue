<template>
  <div class="title-input-layout">
    <p v-if='!isFitWidthProp' class="title-layout" :style="{'width': titleWidthProp}"> <span v-if="isMustProp" class="must-flag-layout">*</span> {{ $t(titleProp) }}</p>
    <p v-else class="title-layout title-width-fit-layout"> <span v-if="isMustProp" class="must-flag-layout">*</span> {{ $t(titleProp) }}</p>
    <el-input
      v-if="!isNumberTypeProp"
      v-model="inputContent"
      :placeholder="this.placeholder"
      type="text"
      :maxlength="maxlengthProp !== -1 ? maxlengthProp : -1"
      :minlength="minlengthProp !== -1 ? minlengthProp : -1"
      :show-word-limit="showWordLimit"
      @keyup.enter.native="enterAction"
      @blur="enterAction"
      clearable
      :style="{'width':inputWidthProp}"
      @input="changeValueAction" />
    <el-input
      v-if="isNumberTypeProp"
      type="number"
      min="1"
      v-model="inputContent"
      @keyup.enter.native="enterAction"
      @blur="enterAction"
      :style="{'width':inputWidthProp}"
      @input="changeValueAction" />
  </div>
</template>

<script>
export default {
  name: 'TitleAndInputComponentV2',
  props: {
    titleProp: '',
    placeholder: {
      type: String,
      default: ''
    },
    titleWidthProp: {
      type: String,
      default: '70px'
    },
    inputWidthProp: {
      type: String,
      default: '200px'
    },
    isMustProp: {
      type: Boolean,
      default: false
    },
    isFitWidthProp: {
      type: Boolean,
      default: false
    },
    isNumberTypeProp: {
      type: Boolean,
      default: false
    },
    minlengthProp: {
      type: Number,
      default: -1
    },
    maxlengthProp: {
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
    isFormCreate: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFilterOnceWatch: false,
      inputContent: (this.value !== undefined && this.value !== null) ? this.value : ''
    }
  },
  methods: {
    changeValueAction (chageValue) {
      console.log('chageValue = ' + chageValue)
      if (!this.isNumberTypeProp) {
        if (chageValue !== undefined) {
          chageValue = chageValue.trim()
          this.$emit('on-input-content-change', {tag: this.tag, data: chageValue})
          if (this.isFormCreate) {
            this.$emit('input', chageValue)
          }
        }
      } else {
        if ((chageValue !== undefined) && (!Number.isNaN(chageValue))) {
          this.$emit('on-input-content-change', {tag: this.tag, data: chageValue})
          if (this.isFormCreate) {
            this.$emit('input', chageValue)
          }
        }
      }
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
    },
    enterAction (content) {
      console.log('enterAction =' + this.inputContent)
      this.$emit('on-enter-action', this.inputContent)
    }

  },
  watch: {
    value (to, from) {
      if (to !== undefined) {
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
