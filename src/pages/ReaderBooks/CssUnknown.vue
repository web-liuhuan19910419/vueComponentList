<!-- 你不知道的Css读书感想 -->
<template>
<div class='page-content-layout'>
  <h2 class="page-title-layout">{{$t('message.pageTitle.unknownCss')}}</h2>
  <div class="page-new-content-layout">
    <div class="margin-ten-layout">
      <p class="margin-ten-layout text-title-layout">(1)记住无宽度准则: "外部尺寸Block元素的流动性示意实例"</p>
      <h4 class="margin-ten-layout">无宽度，借助流动性</h4>
      <div class="nav">
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
      <img src="@/assets/images/png13.png" alt="">
    </div>
  </div>
  <div>
    <p class="margin-ten-layout text-title-layout" style="text-align: left;">(2)css包裹性质,举个例子：要实现党文字少的时候居中显示，当文字数量变多的时候向左居中。</p>
    <div class="box margin-ten-layout">
      <p id="coreMore" class="content margin-ten-layout" ref="content">
        文字内容
      </p>
    </div>
  </div>
  <p class="margin-ten-layout"><button id="btnMore" @click="moreText">更多文字</button></p>
  <div class="margin-ten-layout">
    <p style="text-align: left;">border-box和content-box的区别</p>
     <div class="box-layout">
     </div>
  </div>
  <div class="margin-ten-layout">
    <p style="text-align: left;" class="text-title-layout">(3)父元素的高度有设置，不是auto值，当子元素高度为100%;</p>
    <div class="father1">
      <div class="child1" style="color: white;">
        我的父亲高160，padding: 30px;我虽然设置了height: 100%; 我的父亲设置了有60px的padding,我是非定位元素，我的高度不会包括父亲的padding,所以我是100px
      </div>
    </div>
    <div class="father2 margin-ten-layout">
      <div class="child2" style="color: white;">
        我的父亲高160，padding: 30px;我虽然设置了height: 100%; 我是定位元素，height: 100%; 我的高度是父元素的全部高度，包括他的padding,所以我的高度是160px;
      </div>
    </div>
  </div>
  <div style="margin-top: 80px;">
    <div class="before-after-layout"></div>
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
  moreText () {
    console.log(this.$refs.content.innerHTML)
    this.$refs.content.innerHTML += '新增文字'
  }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  console.log(Math.random() + '')
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
.box {
  text-align: center;
  padding: 10px;
  background-color:#b70000;
}
.content {
  display: inline-block;
  text-align: left;
}
.box-layout {
  box-sizing: content-box;
  width: 100px;
  margin: 10px;
  padding: 10px;
  height: 100px;
  background-color:blue;
}
.father1 {
  height: 160px;
  padding: 30px;
  box-sizing: border-box;
  background-color: blue;
}
.child1 {
  height: 100%;
  background-color: #cd0000;
}
.father2 {
  height: 160px;
  padding: 30px;
  box-sizing: border-box;
  background-color: blueviolet;
  position: relative;
}
.child2 {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #cd0000;
}
.element {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s;
}
:checked ~ .element {
  max-height: 666px;
}
.content-text {
  height: 22px;
}
.content-text:after{
  content: 'A';
}
.before-after-layout {
  width: 256px;
    height: 256px;
    border-bottom: 1px dashed #ccc;
    text-align: justify;
}
.before-after-layout:before {
    content: "";
    display: inline-block;
    height: 100%;
    width: 1px;
    background-color: chocolate;
}
.before-after-layout:after {
    display: block;
    content: "...\A..";
    white-space: pre-wrap;
}
</style>