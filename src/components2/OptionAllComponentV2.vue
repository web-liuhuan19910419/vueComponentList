<template>
  <div class="check-all-layout">
    <el-checkbox class="check-all-radio" v-model="checked" @change="checkBoxChange">{{this.$t('message.checkAll')}}</el-checkbox>
  </div>
</template>

<script>
  export default {
    name: 'OptionAllComponentV2',
    props: {
      // 现在无法和el-table 使用
      initChecked: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'checked',
      event: 'returnBack'
    },
    data () {
      return {
        checked: (this.initChecked !== undefined && this.initChecked !== null) ? this.initChecked : false
      }
    },
    methods: {
      checkBoxChange (content) {
        this.$emit('on-option-all-switch-change', content)
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
  .check-all-layout {
    display: flex;
    justify-content: flex-start;
    width: 110px;
    height: 45px;
  }

  .check-all-radio {
    width: 30px;
    height: 30px;
    margin-top: 7px;
    margin-left: 8px;
  }

</style>
