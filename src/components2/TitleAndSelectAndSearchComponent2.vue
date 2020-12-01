<template>
  <!--新的单组筛选查询组件-->
  <div class="input-search-layout">
    <p class="title-layout" align="center">{{$t('message.query')}}</p>
    <el-input style="width: 450px"  :placeholder="$t('message.pleaseEnterContent')" v-model="searchContent" clearable class="input-with-select">
      <el-select v-model="selectOptionValue" slot="prepend" :placeholder="$t('message.pleaseSelect')" @change="onSelectChange">
        <el-option
          v-for="item in selectList"
          :key="item.name"
          :label="$t(item.name)"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="searchAction"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'TitleAndSelectAndSearchComponent2',
  props: {
    selectOptionProp: {
      type: String,
      default: '0'
    },
    searchContentProp: {
      type: String,
      default: ''
    },
    optionsProp: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      selectOptionValue: '0',
      searchContent: '',
      selectList: null
    }
  },
  methods: {
    onSelectChange (value) {
      this.selectOptionValue = value
      this.$emit('on-switch-search-index', this.selectOptionValue)
    },
    searchAction () {
      this.$emit('on-search', this.searchContent, this.selectOptionValue)
    }
  },
  beforeMount () {
    if (this.searchContentProp !== undefined) {
      this.searchContent = this.searchContentProp
    }

    if (this.optionsProp !== undefined) {
      this.selectList = this.optionsProp
    }

    if (this.selectList.length > 0) {
      this.selectOptionValue = this.selectList[0].value
    }
  },
  watch: {
    optionsProp (to, from) {
      if (to !== undefined) {
        this.selectList = to
      }
    },
    selectOptionProp (to, from) {
      if (to !== undefined) {
        this.selectOptionValue = to
      }
    },
    searchContentProp (to, from) {
      if (to !== undefined) {
        this.searchContent = to
      }
    },
    searchContent (to, from) {
      if (to !== undefined && to === '') {
        this.$emit('on-search', this.searchContent, this.selectOptionValue)
      }
    }
  }
}
</script>

<style scoped>
  .title-layout {
    width: 50px;
    text-align: left;
  }
  .input-search-layout {
    display: flex;
    justify-content: flex-start;
    text-align: center;
    font-size: 14px;
    align-items: center;
  }

  .el-input .el-select {
    width:fit-content;
    width:-moz-fit-content;
    white-space:nowrap;
    min-width: 110px;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
