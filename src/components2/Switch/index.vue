<template>
  <div class="main-switch-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
    <p
      v-if="isShowTitle && !showTitleLeft"
      class="title_layout_right"
      :style="{ width: this.showTitleWidth + 'px' }"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </p>
    <p
      v-if="isShowTitle && showTitleLeft"
      class="title_layout_left"
      :style="{ width: this.showTitleWidth + 'px' }"
    >
      <span v-if="isMust" class="must-flag-layout">*</span>{{ this.getTitle }}
    </p>
    <el-switch v-model="showValue" v-bind="switchProps" @change="changeAction"></el-switch>
  </div>
</template>

<script>
export default {
  name: 'TitleAndSwitch',
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
    // 星标显示
    isMust: {
      type: Boolean,
      default: false
    },
    // el-switch props
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    activeText: String,
    inactiveText: String,
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String,
    size: String
  },
  data() {
    return {
      showValue: this.value !== undefined ? this.value : ''
    }
  },
  methods: {
    changeAction(content) {
      this.$emit('input', content)
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    switchProps() {
      return {
        disabled: this.disabled,
        width: this.width,
        activeIconClass: this.activeIconClass,
        inactiveIconClass: this.inactiveIconClass,
        activeText: this.activeText,
        inactiveText: this.inactiveText,
        activeColor: this.activeColor,
        inactiveColor: this.inactiveColor,
        activeValue: this.activeValue,
        inactiveValue: this.inactiveValue,
        name: this.name,
        validateEvent: this.validateEvent,
        id: this.id
      }
    },
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  watch: {
    value(to, from) {
      if (to !== undefined) {
        this.showValue = to
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-switch-layout {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.title_layout_right {
  text-align: right;
  padding: 0 10px 0 0;
}
.title_layout_left {
  text-align: left;
  padding: 0 10px 0 0;
}
</style>
