<template>
  <div class="title-main-layout">
    <p v-if="!this.getIsFitTitleWidth" class="sub-title-layout align-start-vertical-row-start" :style="{'width':`${this.titleLabelWidth}px`}"><span v-if="isMustProp" class="must-flag-layout">*</span>{{ $t(title) }}</p>
    <p v-else class="sub-title-layout align-start-vertical-row-start" :class="[{'sub-title-fit-layout' : this.getIsFitTitleWidth}]"><span v-if="isMustProp" class="must-flag-layout">*</span>{{ $t(title) }}</p>
    <div>
      <el-checkbox-group v-model="checkedList" @change="handleCheckChange">
        <el-checkbox v-for="item in getOptionsData" :label="item.value" :key="item.name">{{$t(item.name)}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
  import isTheOne from '@/utils/util/isTheOne'

  export default {
    name: 'TitleAndMuticheckComponent',
    props: {
      title: {
        type: String,
        default: ''
      },
      defaultCheck: {
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
        checkedList: []
      }
    },
    mounted () {
      this.checkedList = this.defaultCheck
    },
    methods: {
      // 勾选函数
      handleCheckChange (value) {
        this.$emit('input', value)
      },
      // 表单禁用事件
      onDisabled (disabled) {
        this.disabled = disabled
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
      },
      defaultCheck: {
        deep: true,
        handler: function (newV, oldV) {
          console.log(newV)
          this.checkedList = newV
          console.log(this.checkedList)
        },
        immediate: true
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
    align-items: center;
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
