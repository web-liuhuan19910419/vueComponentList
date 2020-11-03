<template>
  <div class="header-layout" :style="{'height': getHeaderHeight()}">
     <div class="left">
       欢迎来到月明心清的个人博客
     </div>
     <div class="center">
       
     </div>
     <div class="right">
        <select-component
          titleProp="语言"
          :optionsProp="enMethod"
          value="zh"
          @on-select-change="onChangeLan">
        </select-component>
     </div>
  </div>
</template>
<script>
import SelectComponent from '@/components/SelectComponent'
  export default {
    name: 'HeaderComponent',
    components: {
      SelectComponent
    },
    props: {},
    data () {
      return {
        enMethod: [
          {name: 'ZH', value: 'zh'},
          {name: 'EN', value: 'en'}
        ]
      }
    },
    methods: {
      getHeaderHeight () {
        return this.$globalConst.headerHeight + 'px'
      },
      handleCommand (command) {
        console.log(command)
      },
      handleLanguage() {
       this.$cookies.set("language", this.language)
      },
      onChangeLan (value) {
        console.log(value)
        this.$cookies.set("language", value) // 缓存住语言类型
        this.$i18n.locale = value  // 改变当前语言
      }
    }
  }
</script>
<style scoped>
  .header-layout {
    width: 100%;
    background-color: #24292e;
  }
  .left {
    float: left;
    font-weight: 700;
    color: #fff;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
  }
  .right {
    float: right;
    height: 45px;
    line-height: 45px;
    margin-right: 20px;
  }
</style>
