<template>
  <div :class="['text-layout-' + currentSize, 'text-color-layout']">
    <p>
      {{ $t('message.content.currentSearchResult') + (this.resultCount === 0 ? '' : resultCount) }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'CurrentSearchResult',
  props: {
    size: String,
    resultCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.text-color-layout {
  color: $wms-color-text-secondary;
  text-align: left;
  display: flex;
  align-items: center;
}
</style>
