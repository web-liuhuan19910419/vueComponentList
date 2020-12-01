/**
 * 在内容页面的互斥按钮组件，在多个按钮中，只选中一个.
 */
 <template>
  <div class="mutex-switch-button-layout">
    <p class="mutex-switch-title-layout" v-if="isMustProp"><span style="color:#E53646;">*&nbsp;</span>{{ $t(mutexTitle)}}</p>
    <p class="mutex-switch-title-layout" v-else>{{ $t(mutexTitle)}}</p>
    <ul class="ul-layout item-margin-left-layout">
        <el-radio-group v-model="selectValue" @change="onChangeAction">
            <el-radio-button v-for="(option, index) in showOptions" :key="option.name+index.toString()" :label="option.value">{{ $t(option.name)}}</el-radio-button>
        </el-radio-group>
    </ul>
  </div>
 </template>

<script>
export default {
  name: 'MutexSwitchButtonComponentV2',
  components: {
  },
  props: {
    isMustProp: {
      type: Boolean,
      default: false
    },
    mutexTitle: {
      type: String,
      default: ''
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
    currentSelectIndexProp: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      fristRunFlag: false,
      selectValue: (this.currentSelectIndexProp !== undefined && this.currentSelectIndexProp !== null) ? this.currentSelectIndexProp : '',
      showOptions: []
    }
  },
  methods: {
    handleValue () {
      this.showOptions = []
      let element = {}
      for (let index in this.value) {
        let item = this.value[index]
        if (item.value === undefined || item.value === null) {
          item.value = index.toString()
        }
        element = {
          name: item.name,
          value: item.value
        }
        this.showOptions.push(element)
      }
    },
    onChangeAction (content) {
      this.$emit('on-mutex-button-action', Number.parseInt(this.selectValue))
    },
    // form-create
    // 表单禁用事件
    onDisabled (disabled) {
      this.disabled = disabled
    },
    // 表单重置事件
    onResetField () {
      this.showOptions = []
    },
    // 通过setValue,changeField,changeValue方法设置表单值时事件
    onSetValue (val, $f) {
      this.value = val
      this.handleValue()
    },
    onSetSelectValue (val) {
      this.selectValue = val
    }
  },
  mounted () {
    this.handleValue()
  },
  watch: {
    currentSelectIndexProp (to, from) {
      if (to !== undefined) {
        this.selectValue = to
      }
    }
  }
}
</script>

<style scoped>

    .mutex-switch-button-layout {
        display: flex;
        justify-content: flex-start;
        width:fit-content;
        width:-webkit-fit-content;
        width:-moz-fit-content;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        margin-right: 10px;
        align-items: center;
    }

  .mutex-switch-title-layout {
    font-size: 14px;
    color: #484848;
    margin-right: 6px;
  }

  .ul-layout {
    display: flex;
    justify-content: flex-start;
  }

</style>
