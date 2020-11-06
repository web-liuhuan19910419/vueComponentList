<!--阿里矢量图标的使用-->
<template>
<div class='page-content-layout'>
  <h2 class="page-title-layout">{{$t('message.pageTitle.alicont')}}</h2>
  <div class="page-new-content-layout">
    <ul class="ul-layout">
    <li>1 项目中很多地方需要用到图标</li>
    <li>阿里矢量图标库里有很多常用的库，可以满足普通的项目使用。有很多种方法使用阿里矢量图标，下面讲一下我这个项目中如何使用</li>
    <li>阿里矢量官网：https://www.iconfont.cn/, 在里面搜索自己需要的图标下载下来。</li>
    <li>将如下的文件复制大片assets/icon文件夹中</li>
    <li><img src="@/assets/images/png11.png" alt=""></li>
    <li>使用的时候，直接class=""使用</li>
    <li><img src="@/assets/images/png12.png" alt=""></li>
  </ul>
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