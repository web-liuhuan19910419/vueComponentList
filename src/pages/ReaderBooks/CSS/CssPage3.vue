<!--你不知道的CSS的page1-->
<template>
<div class=''>
  <div class="margin-ten-layout">
    <p style="text-align: left;" class="text-title-layout">(3)父元素的高度有设置，不是auto值，当子元素高度为100%;非定位元素如果设置height：100%；那他相对于父元素的content的高度，不包括父元素的padding和margin。</p>
    <div class="father1 margin-ten-layout">
      <div class="child1" style="color: white;">
        我的父亲高160，padding: 30px;我虽然设置了height: 100%; 我的父亲设置了有60px的padding,我是非定位元素，我的高度不会包括父亲的padding,所以我是100px
      </div>
    </div>
    <div class="father2 margin-ten-layout">
      <div class="child2" style="color: white;">
        我的父亲高160，padding: 30px;我虽然设置了height: 100%; 我是定位元素，height: 100%; 我的高度是父元素的全部高度，包括他的padding,所以我的高度是160px;
      </div>
    </div>
    <div>
      <a href="#1">我是a标签</a>
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
</style>