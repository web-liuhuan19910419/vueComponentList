<!--数组截取函数-->
<template>
<div class='page-content-layout'>
   <h2 class="page-title-layout">{{$t('message.pageTitle.lodash')}}</h2>
   <div style="width: 50%; float: left">
      <div class="slice-layout">
        <h4 style="text-align: left;">slice截取源码</h4>
        <title-and-input title="要截取的数组"    class="margin-top-layout" v-model="objectStr" placeholder="num1, num2, num3...."></title-and-input>
        <title-and-input-number title="起始位置" class="margin-top-layout" v-model="start" :min="-99"></title-and-input-number>
        <title-and-input-number title="结束位置" class="margin-top-layout" v-model="end" :min="-99"></title-and-input-number>
        <title-and-input title="结果" class="margin-top-layout"  v-model="result"></title-and-input>
        <div style="text-align: left;"><el-button @click="onSlice">截取</el-button></div>
      </div> 
   </div>
   <div style="width: 50%; height: 100px; background-color: red; float: right;">

   </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TitleAndInput from '@/components2/TitleAndInputComponent'
import TitleAndInputNumber from '@/components2/TitleAndInputNumber'
import variables from '@/styles/variables.scss'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
   TitleAndInputNumber,
   TitleAndInput
},
data() {
//这里存放数据
return {
  objectStr: '1, 2, 3',
  start: null,
  end: null,
  result: ''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   // 截取函数
  slice (arr, start, end) {
     console.log(arguments)
    let length = arr === null ? 0 : arr.length
    if (length === 0) {
       return []
    }
    start = start === null  ? 0: start
    end = end === null ? length : end
    if (start < 0) {
      start = -start > length ? 0: (length + start)
    }
    end = end > length ?  length : end
    if (end < 0) {
       end +=length
    }
    length = end > start ? (end-start) >>> 0 : 0
    start >>>= 0
    let index = -1
    let result = new Array(length)
    while (++index < length) {
       result[index] = arr[index + start]
    }
    return result
  }, 
  chunk (arr, size) {
     size = size <= 0 ? 0 : size
  },
  onSlice () {
    let arr = this.objectStr.split(',')
    this.result = this.slice(arr, this.start, this.end).join(',')
    console.log(this.result)
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  console.log(variables)
   let arr1 = [1, 2, 3, 4, 5]
    this.slice(arr1, 0, 2)
    console.log(this.slice(arr1, 0, 2))
    console.log(arr1)
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
<style lang="scss" scoped>
  .slice-layout {
     text-align: center;
  }
  .margin-top-layout {
     margin-top: 10px;
  }
</style>