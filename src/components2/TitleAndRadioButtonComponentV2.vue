<template>
  <div class="title-main-layout">
    <p v-if="!this.getIsFitTitleWidth" class="sub-title-layout align-start-vertical-row-start" :style="{'width':`${this.titleLabelWidth}px`}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{ $t(title) }}</p>
    <p v-else class="sub-title-layout align-start-vertical-row-start" :class="[{'sub-title-fit-layout' : this.getIsFitTitleWidth}]"><span v-if="isMustProp" class="must-flag-layout">*</span>{{ $t(title) }}</p>
    <div>
      <el-radio-group v-model="selectValue" @change="onChange">
        <el-radio-button v-for="(item, index) in getOptionsData" :key="index.toString()" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import isTheOne from '@/utils/util/isTheOne'

  export default {
    name: 'TitleAndRadioButtonComponentV2',
    props: {
      title: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
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
      tag: {
        type: Number,
        default: 0
      },
      options: {
        type: Array,
        default: () => {
          return []
        }
      },
      isMustProp: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selectValue: !isTheOne.isUndefinedAndNull(this.value) ? this.value : ''
      }
    },
    methods: {
      onChange () {
        this.$emit('input', this.selectValue)
      },
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.selectValue = !isTheOne.isUndefinedAndNull(this.value) ? this.value : ''
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.selectValue = val
      }
    },
    computed: {
      getOptionsData () {
        return this.options
      },
      getIsFitTitleWidth () {
        return this.isFitTitleWidthProp
      }
    },
    watch: {
      value (to, from) {
        this.selectValue = !isTheOne.isUndefinedAndNull(this.value) ? this.value : ''
      }
    }
  }
</script>

<style scoped>

  .title-main-layout {
    min-height: 30px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  .sub-title-layout {
    font-size: 14px;
    color: #484848;
    line-height: 15px;
    max-height: 30px;
    text-align: left;
    overflow: visible;
    margin: 0px 0px;
    word-break: break-all;
    padding: 0 10px 0 0;
  }

  .sub-title-fit-layout {
    width:fit-content;
    width:-moz-fit-content;
    white-space:nowrap;
  }

</style>
