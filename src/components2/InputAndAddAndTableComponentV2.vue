<template>
  <div>
    <div style="margin-top: 20px; text-align: center">
      <el-input
        clearable
        type="text"
        v-model="dInputContent"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeHolder"
        :style="{'width': this.inputWidth}"/>
      <el-button @click="addAction">{{btnTitle}}</el-button>
    </div>
    <muti-lang-base-grid-component-v2
      style="margin-top: 10px;"
      ref="prductOnTheWayLayoutRef"
      :row-height="40"
      :base-attrs="bAttrs"
      :value="bValue"
      :height="bHeight"
      @input="changeDataFun"/>
  </div>
</template>

<script>
  import MutiLangBaseGridComponentV2 from '@/components2/MutiLangBaseGridComponentV2'
  export default {
    name: 'InputAndAddAndTableComponentV2',
    components: {
      MutiLangBaseGridComponentV2
    },
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      baseAttrs: {
        type: Array,
        default: () => {
          return []
        }
      },
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      height: {
        type: Number,
        default: -1
      },
      btnTitle: {
        type: String,
        default: 'Add'
      },
      placeHolder: {
        type: String,
        default: ''
      },
      inputWidth: {
        type: String,
        default: '250px'
      },
      addFuntion: {
        type: Function
      }
    },
    data () {
      return {
        bAttrs: (this.baseAttrs !== undefined && this.baseAttrs !== null) ? this.baseAttrs : [],
        bValue: (this.value !== undefined && this.value !== null) ? this.value : [],
        bHeight: (this.height !== undefined && this.height !== null) ? this.height : -1,
        dInputContent: ''
      }
    },
    methods: {
      changeDataFun (data) {
        this.$emit('input', data)
      },
      addAction () {
        if (this.addFuntion !== undefined && this.dInputContent.trim().length !== 0) {
          let data = this.addFuntion(this.dInputContent.trim())
          this.bValue.push(data)
          this.$emit('input', this.bValue)
          this.dInputContent = ''
        }
      },
      delItemAction (row) {
        if (row < this.bValue.length && row >= 0) {
          this.bValue.splice(row, 1)
        }
      }
    },
    watch: {
      value (to, from) {
        if (to !== undefined && to !== null) {
          this.bValue = to
        } else {
          this.bValue = []
        }
      },
      baseAttrs (to, from) {
        if (to !== undefined && to !== null) {
          this.bAttrs = to
        } else {
          this.bAttrs = []
        }
      },
      height (to, from) {
        if (to !== undefined && to !== null) {
          this.bHeight = to
        } else {
          this.bHeight = -1
        }
      }
    }
  }
</script>

<style scoped>

</style>
