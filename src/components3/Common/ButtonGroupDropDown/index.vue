<template>
  <div>
    <el-dropdown
      :size="currentSize"
      :split-button="getSplitButton"
      type="primary"
      @command="handleCommand"
      @click="handleClick"
    >
      <span v-if="!getSplitButton">
        <el-button v-bind="btnProps">
          {{ currentSelectItem }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
      </span>
      <span v-else> {{ currentSelectItem }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) of options" :command="index" :key="index">{{
          item.indexOf('message.') !== -1 ? $t(item) : item
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroupDropDown',
  props: {
    size: String,
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    splitButton: {
      type: Boolean,
      default: true
    },
    // splitButton: false
    btnProps: {
      type: Object,
      default: () => {
        return { type: 'primary', round: true }
      }
    }
  },
  components: {},
  data() {
    return {
      currentSelectItem: '',
      currentIndex: 0
    }
  },
  computed: {
    currentSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    getSplitButton() {
      return this.splitButton
    }
  },
  methods: {
    getCurrentButton() {
      this.currentSelectItem =
        this.options[this.currentIndex].indexOf('message.') !== -1
          ? this.$t(this.options[this.currentIndex])
          : this.options[this.currentIndex]
    },
    handleCommand(index) {
      console.log(index)
      this.currentIndex = index
      this.getCurrentButton()
    },
    handleClick() {
      console.log(this.currentIndex)
      this.$emit('input', this.currentIndex)
    }
  },
  mounted() {
    this.getCurrentButton()
  },
  watch: {
    '$i18n.locale'() {
      this.getCurrentButton()
    }
  }
}
</script>
<style></style>
