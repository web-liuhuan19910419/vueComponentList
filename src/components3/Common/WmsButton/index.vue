<template>
  <div>
    <el-button type="primary" @click="onClick">{{
      buttonTitle.indexOf('message.') === -1 ? buttonTitle : $t(buttonTitle)
    }}</el-button>
  </div>
</template>
<script>
export default {
  name: 'WmsButton',
  props: {
    buttonType: {
      type: String,
      default: 'primary'
    },
    buttonTitle: {
      type: String,
      default: '2222222'
    }
  },
  components: {},
  methods: {
    onClick() {
      this.$emit('input')
    }
  },
  data() {
    return {}
  }
}
</script>
<style></style>
