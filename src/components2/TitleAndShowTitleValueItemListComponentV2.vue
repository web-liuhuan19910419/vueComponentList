<template>
    <div style="text-align: left;">
      <span class="main-title-value-color" :style="{width: getTitleWidth}" style="font-size: 14px">{{this.title}}</span>
      <div>
        <div class="show-list-layout" v-for="index in (Number.parseInt(showValue.length / 2) + ((showValue.length % 2) !== 0 ? 1 : 0))" :key="showValue.toString() + index.toString()">
          <title-and-content-component-v2 v-if="showValue[(index - 1) * 2].click"
                                          :title="showValue[(index - 1) * 2].title"
                                          :value="showValue[(index - 1) * 2].value"
                                          :content-width=getContentWidth
                                          :tag="(index - 1) * 2"
                                          :is-click=true
                                          @on-content-click="onContentClick"></title-and-content-component-v2>
          <title-and-content-component-v2 v-else
                                          :title="showValue[(index - 1) * 2].title"
                                          :value="showValue[(index - 1) * 2].value"
                                          :content-width=getContentWidth
                                          :tag="(index - 1) * 2"></title-and-content-component-v2>

          <title-and-content-component-v2 v-if="(index - 1) * 2 + 1 < showValue.length && showValue[(index - 1) * 2 + 1].click"
                                            :title="showValue[(index - 1) * 2 + 1].title"
                                            :value="showValue[(index - 1) * 2 + 1].value"
                                            :content-width='getContentWidth'
                                            :tag="(index - 1) * 2 + 1"
                                            :is-click=true
                                            @on-content-click="onContentClick"></title-and-content-component-v2>
          <title-and-content-component-v2 v-else-if="(index - 1) * 2 + 1 < showValue.length"
                                          :title="showValue[(index - 1) * 2 + 1].title"
                                          :value="showValue[(index - 1) * 2 + 1].value"
                                          :content-width='getContentWidth'
                                          :tag="(index - 1) * 2 + 1"></title-and-content-component-v2>
        </div>
        <title-and-photo-list-component-v2 v-if="getIsEndShowPhotoList"
        :title="getPhotoTitle"
        :value="getShowPhotoList"/>
      </div>
    </div>
</template>

<script>
  import TitleAndContentComponentV2 from '@/components2/TitleAndContentComponentV2'
  import TitleAndPhotoListComponentV2 from '@/components2/TitleAndPhotoListComponentV2'

  // TODO 图片不实现点击事件
  export default {
    name: 'TitleAndShowTitleValueItemListComponentV2',
    components: {
      TitleAndContentComponentV2,
      TitleAndPhotoListComponentV2
    },
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
      titleWidth: {
        type: String,
        default: '160px'
      },
      contentWidth: {
        type: Number,
        default: 240
      },
      isEndShowPhotoList: {
        type: Boolean,
        default: false
      },
      showPhotoList: {
        type: Array,
        default: () => {
          return []
        }
      },
      lang: {
        type: String,
        default: 'cn'
      }
    },
    data () {
      return {
        showValue: (this.value !== undefined && this.value !== null) ? this.value : []
      }
    },
    methods: {
      // {tag: this.tag, data: data}
      onContentClick (data) {
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
      }
    },
    mounted () {
    },
    computed: {
      getTitleWidth () {
        return this.titleWidth
      },
      getContentWidth () {
        return this.contentWidth
      },
      getPhotoTitle () {
        let tmpT = ''
        if (this.lang === 'cn') {
          tmpT = '照片'
        } else {
          tmpT = 'Photo'
        }

        return tmpT
      },
      getIsEndShowPhotoList () {
        return this.isEndShowPhotoList
      },
      getShowPhotoList () {
        return this.showPhotoList
      }
    },
    watch: {
      value (to, from) {
        if (to !== undefined && to !== null) {
          this.showValue = to
        } else {
          this.showValue = []
        }
      }
    }
  }
</script>

<style scoped>

  .show-list-layout {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .show-item-layout {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

</style>
