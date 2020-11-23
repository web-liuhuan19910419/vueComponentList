<!--常用的基础组件之多选组件-->
<template>
  <div class="radio-wrap">
    <p :style="{'width': titleWidth}" class="title"><span class="ismust">*</span>{{title}}</p>  
    <ul :class="[!isVertical ? 'hirizon' : 'vertical']">
       <li v-for="(item, index) of radioOptions" :key="index" @click="radioChangeEvent(item, index)" :class="[item.value === '2' ? 'disableStyle' : item.value === '1' ? 'activeStyle' : 'noActiveStyle']"  :style="{marginLeft: marginLeftSet, marginTop: marginTopSet}">
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
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    marginLeftSet: {
      type: String,
      default: '0px'
    },
    marginTopSet: {
     type: String,
    default: '0px'
    }
  },
  data () {
    return {}
  },
  methods: {
		radioChangeEvent (item, index) {
      console.log(item, index)
      console.log(this.radioOptions)
      if (item.value !== '2') {
        item.value = ((item.value === '1') ? '0' : '1')
      }
      console.log(this.radioOptions)
      this.$emit('radio-chage-event', this.radioOptions)
		},
    chooseSrc (value) {
      if (value === '0') { // 未选中
        return require('../assets/images/mutiRadio/normal.png')
      } else if (value === '1') { // 选中
        return require('../assets/images/mutiRadio/actived.png')
			} else { // 禁用
        return require('../assets/images/mutiRadio/disabled.png')
			}
    }
  }
}
</script>

<style scoped>
.radio-wrap {
  display: flex;
  align-items: center;
}
.title {
  font-size: 12px;
  text-align: left;
}
.ismust{
  color:#ff0000;
}
.imageSize{
  width: 16px;
  height: 16px;
}
.label {
  font-size: 12px;
}
li {
  display: flex;
  align-items: center;
}
.hirizon {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.disableStyle:hover{
  cursor: not-allowed;
}
.activeStyle:hover {
  cursor: pointer;
}
.noActiveStyle:hover {
  cursor: pointer;
}
</style>