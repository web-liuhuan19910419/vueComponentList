<!--项目说明页面 -->
<template>
  <div class='page-content-layout'>
    <h2 class="page-title-layout">{{$t('message.pageTitle.caculation')}}</h2>
    <div class="page-new-content-layout">
      <div>
        很多计算其实可以简化
        <ul class="ul-layout">
          <li>(1)一个数乘以1.1, 用错位相加法，约等于这个数除以0.9</li>
          <li>(2)一个数除以1.1，约等于错位相减法, 约等于这个数乘以0.9</li>
          <li>(3)当比较两个分母之间的大小的时候，如果比较简单的可以用直除法。另外也可以看横向分子与分母的比例大小，比例小的统一视为1,再比较大小</li>
          <li>(4)如果有选项的选择题，看选项之间的差别, 选项如果首位都不相同的话,就是差别大。差别大的话，可以截两位位计算,差别小的话，就截取三位。四舍五入用法。</li>
          <li>(5)同比和环比的关系：同比是比较上一年度的同一时期;环比是比较上一季度或者上一月的比例</li>
          <li>(6)当增长率的绝对值小于5%的时候, 现期/1+r% 可以简化为：现期 - 现期*r%; 同理: 现期/1-r% 可以简化为：现期 + 现期*r%</li>
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