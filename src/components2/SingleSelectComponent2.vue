
<template>
  <div class="main-sigle-select-layout">
    <p v-if="isShowTitle && !showTitleLeft" class="title_layout_right" :style="{'width': this.showTitleWidth + 'px'}">{{this.$t(this.title)}}</p>
    <p v-if="isShowTitle && showTitleLeft" class="title_layout_left" :style="{'width': this.showTitleWidth + 'px'}">{{this.$t(this.title)}}</p>
    <div class="single-select-layout">
      <el-select v-model="selected"
                 filterable
                 @change="selectMethod"
                 :placeholder="$t(selectPlaceholder)"
                 :style="{'width': this.singleSelectWidthProp + 'px'}">
        <el-option
          v-for="item in showOption"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleSelectComponent2',
  props: {
    selectedProp: Number,
    selectPlaceholder: {
      type: String
    },
    options: {
      default: Array
    },
    isLocalData: true,
    singleSelectWidthProp: {
      type: Number,
      default: 200
    },
    isShowTitle: {
      type: Boolean,
      default: false
    },
    showTitleLeft: {
      type: Boolean,
      default: false
    },
    showTitleWidth: {
      type: Number,
      default: 120
    },
    title: {
      type: String
    }
  },
  components: {
  },
  data () {
    return {
      selected: '',
      selectLabel: '',
      showOption: []
    }
  },
  methods: {
    selectMethod (query) {
      for (let index = 0; index < this.showOption.length; index++) {
        let element = this.showOption[index]
        if (element.name === query) {
          this.currentIndex = index
        }
      }
      this.$emit('on-select-change', this.currentIndex)
    },
    langSwitch () {
      if (this.isLocalData === false) {
        return
      }
      this.showOption = []
      for (let index = 0; index < this.options.length; index++) {
        let itemD = {}
        let element = this.options[index]
        if (element.name.indexOf('message.') === -1) {
          itemD.name = element.name
        } else {
          itemD.name = this.$t(element.name)
        }
        this.showOption.push(itemD)
      }
    },
    configShowOptionsFromNet () {
      this.showOption = []
      for (let index = 0; index < this.options.length; index++) {
        let element = this.options[index]
        let itemD = {}
        itemD.name = element.name
        this.showOption.push(itemD)
      }
    }
  },
  beforeMount () {
    if (this.selectedProp !== undefined) {
      this.currentIndex = this.selectedProp
      if (this.options[this.currentIndex] !== undefined) {
        if (this.options[this.currentIndex].name.indexOf('message.') === -1) {
          this.selected = this.options[this.currentIndex].name
        } else {
          this.selected = this.$t(this.options[this.currentIndex].name)
        }
      }
    }
    this.langSwitch()
  },
  watch: {
    '$i18n.locale' (to, from) {
      this.langSwitch()
      if (this.options[this.currentIndex] !== undefined) {
        if (this.options[this.currentIndex].name.indexOf('message.') === -1) {
          this.selected = this.options[this.currentIndex].name
        } else {
          this.selected = this.$t(this.options[this.currentIndex].name)
        }
      }
    },
    options (to, from) {
      this.configShowOptionsFromNet()
    }
  }
}
</script>

<style scoped>
  .main-sigle-select-layout {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
  }
  .title_layout_right {
    text-align: right;
    padding: 0 5px 0 0;
  }
  .title_layout_left {
    text-align: left;
  }
.single-select-layout {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
