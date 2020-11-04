<!--项目说明页面 -->
<template>
  <div class='page-content-layout'>
    <h2 class="page-title-layout">{{$t('message.pageTitle.projectInfo')}}</h2>
    <div class="page-new-content-layout">
      <div>
        <ul class="ul-layout">
          <li>
            <ul class="ul-layout">
              <li> (1)Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。有三个组件：</li>
              <li> CLI：@vue/cli 全局安装的 npm 包，提供了终端里的vue命令（如：vue create 、vue serve 、vue ui 等命令）</li>
              <li> CLI 服务：@vue/cli-service是一个开发环境依赖。构建于 webpack 和 webpack-dev-server 之上（提供 如：serve、build 和 inspect 命令）</li>
              <li> CLI 插件：给Vue 项目提供可选功能的 npm 包 （如： Babel/TypeScript 转译、ESLint 集成、unit和 e2e测试 等）</li>
            </ul>
          </li>
          <li>
            (2)安装
            <ul class="ul-layout">
              <li>1.全局安装过旧版本的 vue-cli(1.x 或 2.x)要先卸载它，否则跳过此步:npm uninstall vue-cli -g //或者 yarn global remove vue-cli</li>
              <li>2. Vue CLI 3需要 nodeJs ≥ 8.9 (官方推荐 8.11.0+，你可以使用 nvm 或 nvm-windows在同一台电脑中管理多个 Node 版本）。下载安装nodeJs，中文官方下载地址：http://nodejs.cn/download/</li>
              <li>3. 安装脚手架 cnpm install -g @vue/cli //yarn global add @vue/cli</li>
            </ul>
          </li>
          <li>
            (3)使用
            <ul class="ul-layout">
              <li>1.新建项目vue create Project Name //文件名 不支持驼峰（含大写字母）</li>
              <li>2.接下来的操作就根据项目的需要和cli的命令提示自助选择,一个简单的cli3项目就创建成功啦。</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
   .ul-layout {
    margin-top: 20px;
  }
  .ul-layout > li {
    margin-top: 10px;
  }

</style>