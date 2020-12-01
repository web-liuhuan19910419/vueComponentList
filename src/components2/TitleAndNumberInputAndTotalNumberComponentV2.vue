<template>
  <div>
    <div v-for="(item, index) in showData" :key="index">
      <div class="row_number_input_total">
        <title-and-number-input-component-v2
          :title-prop="item.title"
          :min-value="item.min"
          :max-value="item.max"
          :precision="0"
          :value="item.value"
          :tag="index"
          :placeholder="getNumberPlaceholder"
          @on-input-content-change="onNumberInputContentChange">
        </title-and-number-input-component-v2>
        <div style="margin-left: 20px">
        <span>
          {{item.showTotal}}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleAndNumberInputComponentV2 from '@/components2/TitleAndNumberInputComponentV2'
  export default {
    name: 'TitleAndNumberInputAndTotalNumberComponentV2',
    components: {
      TitleAndNumberInputComponentV2
    },
    props: {
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
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showData: this.value !== undefined && this.value !== null ? this.value : []
      }
    },
    methods: {
      onNumberInputContentChange (content) {
        if (content.tag >= 0 && content.tag < this.showData.length) {
          this.showData[content.tag].value = content.data.toString()
        }
        this.$emit('on-row-input-content-change', content.tag, content.data, this.showData)
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
    computed: {
      getNumberPlaceholder () {
        return this.placeholder
      }
    },
    watch: {
      value (to, from) {
        if (to !== undefined && to !== null) {
          this.showData = to
        } else {
          this.showData = {}
        }
      }
    }
  }
</script>

<style scoped>

  .row_number_input_total {
    display: flex;
  }

</style>
