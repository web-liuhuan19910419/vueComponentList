<!--常用的基础组件之单选组件-->
<template>
  <div class="radio-wrap">
    <p :style="{'width': titleWidth}" class="title"><span class="ismust">*</span>{{title}}</p>  
    <ul :style="">
       <li v-for="(item, index) of radioOptions" :key="index" @click="radioChangeEvent(item, index)">
          <img :src="chooseSrc(item.value)" alt="" class="imageSize">
          <span class="label">{{item.name}}</span>
       </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isMust: {
      type: Boolean,
      default: false
    },  
    title: {
      type: String,
      default: ''
    },
    radioOptions: {
      type: Array
    },
    titleWidth: {
       type: String,
       default: '100px'
    }
  },
  data () {
    return {}
  },
  methods: {
		radioChangeEvent (item, index) {
			console.log(item, index)
		},
    chooseSrc (value) {
      if (value === '0') { // 未选中
        return require('../assets/images/radio/radio.png')
      } else if (value === '1') { // 选中
        return require('../assets/images/radio/radio-active.png')
			} else { // 禁用
        return require('../assets/images/radio/radio-disabled.png')
			}
    }
  }
}
</script>

<style scoped>
.radio-wrap {
	display: flex;
}
.title {
  font-size: 12px;
  text-align: left;
}
.ismust{
  color: 'red';
}
.imageSize{
  width: 22px;
  height: 22px;
}
.label {
  font-size: 12px;
}
li {
  display: flex;
  align-items: center;
}
</style>