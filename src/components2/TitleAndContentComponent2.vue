<template>
  <div class="title-layout">
    <p v-if="!isFitTitleWidthProp" class="sub-title-layout space-around-vertical-start" :style="{'width':`${this.titleLabelWidth}px`}">{{ $t(title) }}</p>
    <p v-else class="sub-title-layout space-around-vertical-start" :class="[{'sub-title-fit-layout' : isFitTitleWidthProp}]">{{ $t(title) }}</p>
    <p v-if="contentWidth > 0" class="receive-content-layout space-around-vertical-start" :style="{'width':`${this.contentWidth}px`}" v-html="receiveContentProp"></p>
    <p v-else class="receive-content-layout space-around-vertical-start" v-html="receiveContentProp"></p>
  </div>
</template>

<script>
export default {
  name: 'TitleAndContentComponent2',
  props: {
    title: {
      type: String,
      default: ''
    },
    receiveContentProp: {
      type: String,
      default: ''
    },
    titleLabelWidth: {
      type: String,
      default: '160'
    },
    isFitTitleWidthProp: {
      type: Boolean,
      default: false
    },
    contentWidth: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.title-layout {
  min-height: 30px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.sub-title-layout {
  font-size: 14px;
  color: #484848;
  line-height: 20px;
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

.receive-content-layout {
  font-size: 14px;
  color: #969696;
  text-align: left;
  line-height: 20px;
  min-height: 30px;
  width: fit-content;
  word-break: break-all;
}
</style>
