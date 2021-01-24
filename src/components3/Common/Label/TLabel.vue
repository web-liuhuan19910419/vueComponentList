<template>
  <div>
    <div
      v-if="!getIsFitTitleWidth && getIsShowTitle && !getShowTitleLeft"
      class="title_layout_right"
      :style="{ width: this.getShowTitleWidth + 'px' }"
    >
      <span v-if="getIsMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </div>
    <div
      v-if="!getIsFitTitleWidth && getIsShowTitle && getShowTitleLeft"
      class="title_layout_left"
      :style="{ width: this.getShowTitleWidth + 'px' }"
    >
      <span v-if="getIsMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </div>
    <div
      v-if="getIsFitTitleWidth"
      class="title_layout_left"
      :class="[{ 'sub-title-fit-layout': getIsFitTitleWidth }]"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TLabel',
  props: {
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
    // 标题
    title: {
      type: String,
      default: ''
    },
    isFitTitleWidth: {
      type: Boolean,
      default: false
    },
    // 星标显示
    isMust: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    getIsFitTitleWidth() {
      return this.isFitTitleWidth
    },
    getIsShowTitle() {
      return this.isShowTitle
    },
    getShowTitleLeft() {
      return this.showTitleLeft
    },
    getShowTitleWidth() {
      return this.showTitleWidth
    },
    getIsMust() {
      return this.isMust
    }
  }
}
</script>

<style scoped>
.title_layout_right {
  text-align: right;
  padding: 0 5px 0 0;
}
.title_layout_left {
  text-align: left;
  padding: 0 5px 0 0;
}

.sub-title-fit-layout {
  width: fit-content;
  width: -moz-fit-content;
  white-space: nowrap;
}
</style>
