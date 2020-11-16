<!--你不知道的CSS的page1-->
<template>
<div class=''>
  <div>
    <p class="margin-ten-layout text-title-layout" style="text-align: left;">(2)css包裹性质,举个例子：要实现党文字少的时候居中显示，当文字数量变多的时候向左居中。</p>
    <div class="box margin-ten-layout">
      <p id="coreMore" class="content margin-ten-layout" ref="content">
        文字内容
      </p>
    </div>
  </div>
  <p class="margin-ten-layout"><button id="btnMore" @click="moreText">更多文字</button></p>
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
.box {
  text-align: center;
  padding: 10px;
  background-color:#b70000;
} 
.content {
  display: inline-block;
  text-align: left;
}
</style>