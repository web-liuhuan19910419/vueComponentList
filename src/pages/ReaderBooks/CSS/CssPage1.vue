<!--你不知道的CSS的page1-->
<template>
<div class=''>
  <div class="">
    <p class="margin-ten-layout text-title-layout">(1)记住无宽度准则: "外部尺寸Block元素的流动性示意实例"</p>
      <h4 class="margin-ten-layout">无宽度，借助流动性,父元素有宽度，子元素没有设置宽度，子元素会默认充满父元素，这就是借助css的宽度流动性。</h4>
      <div class="nav" style="margin-top: 15px;">
        <a href="" class="nav-a">导航1</a>
        <a href="" class="nav-a">导航2</a>
        <a href="" class="nav-a">导航3</a>
      </div>
      <h4>width:100%</h4>
     <div class="nav">
      <a href="" class="nav-a width">导航1</a>
      <a href="" class="nav-a width">导航2</a>
      <a href="" class="nav-a width">导航3</a>
     </div>
    </div>
    <div class="margin-ten-layout">
      <img src="@/assets/images/png13.png" alt="" style="width: 900px; height:300px;">
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
.width {
  width: 100%;
}

.nav {
  width: 80%;
  background-color: #cd0000;
}
.nav-a {
  display: block;
  margin: 0 10px;
  padding: 9px 10px;
  border-bottom: 1px solid #b70000;
  border-top: 1px solid #de3636;
  color: #fff;
}
.nav-a:first-child { border-top: 0; }
.nav-a + .nav-a + .nav-a { border-bottom: 0;}
</style>