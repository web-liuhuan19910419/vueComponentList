<!-- 国际化说明 -->
<template>
<div class='page-content-layout'>
  <h2 class="page-title-layout">{{$t('message.pageTitle.interNational')}}</h2>
  <div class="page-new-content-layout">
    <p>
      有些项目中需要运用到到多种语言切换的需求，一般使用i18n这个框架。下面讲讲它在vue项目中的使用方法。
    </p>
    <ul class="ul-layout">
      <li>(1) 安装</li>
      <li>安装i18n npm install vue-i18n --save</li>
      <li>因为后台管理系统经常要用到element-ui, 顺便安装element-ui。npm install element-ui --save</li>
      <li>安装vue-cookies npm install vue-cookies --save</li>
    </ul>
    <ul class="ul-layout">
      <li>(2) 在项目中的src下建立文件夹Lang如下图所示</li>
      <li><img src="@/assets/images/png3.png" alt="新建文件夹"></li>
      <li>(3)在Lang文件夹中建立三个js文件,分别是en.js, zh.js, index.js三个文件, 三个文件的内容分别如下图所示</li>
      <li>
        <big-image-component v-if="showImg1" @clickit="viewImg1" :imgSrc="imgSrc1"></big-image-component>
        <img src="@/assets/images/png4.png" @click="clickImg1($event)" style="width: 361px; height: 162px;">
      </li>
      <li>
        <big-image-component v-if="showImg2" @clickit="viewImg2" :imgSrc="imgSrc2"></big-image-component>
        <img src="@/assets/images/png5.png" @click="clickImg2($event)" style="width: 361px; height: 162px;">
      </li>
      <li>
        <big-image-component v-if="showImg3" @clickit="viewImg3" :imgSrc="imgSrc3"></big-image-component>
        <img src="@/assets/images/png6.png" @click="clickImg3($event)" style="width: 361px; height: 162px;">
      </li>
    </ul>
    <ul class="ul-layout">
      <li>(4)在main.js里面引入相关配置</li>
      <li>
        <img src="@/assets/images/png7.png" alt="">
      </li>
    </ul>
    <ul class="ul-layout">
      <li>(4)切换语言</li>
      <li>
        <img src="@/assets/images/png8.png" alt="">
      </li>
    </ul>
    <ul class="ul-layout">
      <li>(5)遇到的难点</li>
      <li>因为项目中一般都是多人合作的,en.js 和 zh.js文件大家都会经常改动，一致性很差，加上开发人员对一些专业名词翻译的并不准确，所以翻译会叫专业人士非开发人员翻译，这就需要开发人员能将js转化为excel,然后又导入到项目中，需要开发一个工具。11111</li>
    </ul>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BigImageComponent from '@/components/BigImageComponent'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  BigImageComponent
},
data() {
//这里存放数据
return {
  imgSrc1: '@/assets/images/png4.png',
  imgSrc2: '@/assets/images/png5.png',
  imgSrc3: '@/assets/images/png6.png',
  showImg1: false,
  showImg2: false,
  showImg3: false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  clickImg1 (e) {
    console.log(e.currentTarget.src)
    this.imgSrc1 = e.currentTarget.src
    this.showImg1 = true
  },
  clickImg2 (e) {
    console.log(e.currentTarget.src)
    this.imgSrc2 = e.currentTarget.src
    this.showImg2 = true
  },
  clickImg3 (e) {
    console.log(e.currentTarget.src)
    this.imgSrc3 = e.currentTarget.src
    this.showImg3 = true
  },
  viewImg1 () {
    this.showImg1 = false
  },
  viewImg2 () {
    this.showImg2 = false
  },
  viewImg3 () {
    this.showImg3 = false
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
  .ul-layout {
    margin-top: 20px;
  }
  .ul-layout > li {
    margin-top: 10px;
  }
</style>