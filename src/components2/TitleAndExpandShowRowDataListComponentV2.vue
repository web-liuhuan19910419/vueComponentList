<template>
    <div>
      <span class="main-title-value-color">{{this.title}}</span>
      <div v-if="isOpen">
        <div v-for="(item, index) in showValue" :key="index.toString()" class="show-list-layout">
          <p v-html="item"></p>
        </div>
      </div>
      <div v-else>
        <div class="show-list-layout">
          <p v-if="0 < showValue.length" v-html="showValue[0]"></p>
          <p v-if="1 < showValue.length" v-html="showValue[1]"></p>
        </div>
      </div>
      <div v-if="!isOpen" class="main-color-primary" @click="expandClick(true)"><el-button type="text">{{this.getExpandTitle(true)}}</el-button><i class="el-icon-arrow-down" style="padding-top: 10px;"></i></div>
      <div v-if="isOpen" class="main-color-primary" @click="expandClick(false)"><el-button type="text">{{this.getExpandTitle(false)}}</el-button><i class="el-icon-arrow-up" style="padding-top: 10px;"></i></div>
    </div>
</template>

<script>
  export default {
    name: 'TitleAndExpandShowRowDataListComponentV2',
    props: {
      title: {
        type: String,
        default: '测试'
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
      lang: {
        type: String,
        default: 'cn'
      }
    },
    data () {
      return {
        showValue: (this.value !== undefined && this.value !== null) ? this.value : [],
        isOpen: false
      }
    },
    methods: {
      getExpandTitle (flag) {
        if (this.lang === 'en') {
          if (flag) {
            return 'Expand All'
          } else {
            return 'Collapse'
          }
        } else {
          if (flag) {
            return '展开全部'
          } else {
            return '收起'
          }
        }
      },
      expandClick (flag) {
        if (flag) {
          this.isOpen = true
        } else {
          this.isOpen = false
        }
      },
      onDisabled (disabled) {
        this.disabled = disabled
      },
      // 表单重置事件
      onResetField () {
        this.showValue = (this.value !== null && this.value !== undefined) ? this.value : []
      },
      // 通过setValue,changeField,changeValue方法设置表单值时事件
      onSetValue (val, $f) {
        this.showValue = val
      },
      onSetLang (val) {
        this.lang = val
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>

  .show-list-layout {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

</style>
