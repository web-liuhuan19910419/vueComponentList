<template>
  <!--树形下拉导航控件-->
   <div class="left-menu-layout" :style="{'width': getMenuWidth(), 'height': getMenuHeight()}">
     <ul v-for="(item, index) of menuList" :key="index">
        <li :class="['list','iconfont', item.checked ? 'icon-tubiao-' : 'icon-jiantou']" @click="onUnfold(item, index)">
           <span class="list-item-layout">{{item.name}}</span>
        </li>
        <ul v-show="item.checked && item.child.length !== 0" class="list-ul-child">
          <li v-for="(ele, i) of item.child" :key="i" @click="activeItem(item, ele, i)" :class="['list', ele.checked ? 'actived': '']">
            <span class="list-item-layout">{{ele.name}}</span>
          </li>
        </ul>
     </ul>
   </div>
</template>
<script>
  export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      menuList: [
        {name: '开发指南', checked: false, value: 1, 
          child: [
            {name: '安装', checked: false, value: '11', 
              child: [
                {
                  name: '安装1', checked: false, value: '111', child: []
                }
              ]
            }, 
            {name: '快速上手', checked: false, value: '12', child: []}
          ]
        },
        {name: '组件列表', value: '2', checked: false,
          child: [
            {
              name: '地址选择组件', value: '21', checked: false, child: []
            }, 
            {
              name: '表单允许加减组件', value: '22', checked: false, child: []
            }, 
            {
              name: '级联选择地址组件', value: '21', checked: false, child: []
            }
          ]
        },
        {
          name: '诗和远方', value: '3', checked: false,
            child: [
              {
                name: '随便瞎想', value: '31', checked: false, child: []
              },
              {
                name: '美好回忆', value: '32', checked: false, child: []
              },
            ]

        }
      ]
    }
  },
  methods: {
    getMenuWidth () {
      return this.$globalConst.sideMenuWidth + 'px'
    },
    getMenuHeight () {
      return this.$globalConst.getShowSideMenuHeight() + 'px'
    },
    onUnfold (item, index) {
      console.log(item)
      item.checked = !item.checked
      console.log(index)
    },
    activeItem (ele, i) {
      console.log(i)
      this.menuList.forEach((item) => {
        if (item.child.length !== 0) {
          item.forEach((element) => {
            if (element.name === ele.name) {
              element.checked = true
            } else {
              element.checked = false
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .left-menu-layout {
     float: left;
  }
  .list {
    text-align: left;
    padding-left: 20px;
    min-height: 40px;
  }
  .list:hover {
    cursor: pointer;
  }
  .list-ul-child {
    text-align: left;
    padding-left: 40px;
  }
  .list-item-layout {
    height: 30px;
    line-height: 30px;
  }
  .list-item-layout:hover {
     cursor: pointer;
     color: #409eff;
  }
  .actived {
    color: #409eff;
  }
</style>