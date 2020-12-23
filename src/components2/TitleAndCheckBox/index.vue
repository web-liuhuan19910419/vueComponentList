<template>
  <div class="main-checkbox-layout" :class="[buttonSize ? 'text-layout-' + buttonSize : '']">
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
    <el-checkbox-group
      v-model="showValue"
      :disabled="getGroupDisabled"
      :min="getGroupMin"
      :max="getGroupMax"
      :size="getGroupSize"
      :fill="getGroupFill"
      :text-color="getGroupTextColor"
      @change="handleChange"
    >
      <component
        :is="getComments()"
        v-for="(item, index) in getOptions"
        :key="index.toString() + getUUID()"
        v-bind="item"
      >
        <slot />
      </component>
    </el-checkbox-group>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
export default {
  name: 'TitleAndCheckBox',
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
    // 初始值
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // tag标记
    tag: {
      type: Number,
      default: 0
    },
    checkboxButton: {
      type: Boolean,
      default: false
    },
    groupDisabled: Boolean,
    groupMin: Number,
    groupMax: Number,
    groupSize: String,
    groupFill: String,
    groupTextColor: String,
    size: String
  },
  data() {
    return {
      showValue: this.value !== undefined ? this.value : []
    }
  },
  methods: {
    getUUID() {
      let u = uuid.v1()
      return u
    },
    getComments() {
      if (this.checkboxButton) {
        return 'el-checkbox-button'
      } else {
        return 'el-checkbox'
      }
    },
    handleChange(content) {
      // ['zujian', 'form', 'radio']  单选
      // [['zujian', 'form', 'CheckBox']] 多选
      this.$emit('input', content, this.tag)
    }
  },
  computed: {
    getTitle() {
      return this.title
    },
    getOptions() {
      return this.options
    },
    getGroupDisabled() {
      return this.groupDisabled
    },
    getGroupMin() {
      return this.groupMin
    },
    getGroupMax() {
      return this.groupMax
    },
    getGroupSize() {
      return this.groupSize
    },
    getGroupFill() {
      return this.groupFill
    },
    getGroupTextColor() {
      return this.groupTextColor
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
.main-checkbox-layout {
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
