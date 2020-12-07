<template>
  <!--树形下拉导航控件-->
   <div class="left-menu-layout" :style="{'width': getMenuWidth(), 'height': getMenuHeight()}">
     <ul v-for="(item, index) of menuList" :key="index">
        <li :class="['list','icon iconfont', item.checked ? 'icon-xiala' : 'icon-rightarrow']" @click="onUnfold(item, index)">
           <span class="list-item-layout">{{item.name}}</span>
        </li>
        <ul v-show="item.checked && item.child.length !== 0" class="list-ul-child">
          <li v-for="(ele, i) of item.child" :key="i" @click="activeItem(ele, i)" :class="['list', ele.checked ? 'actived': '']">
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
            {name: '项目说明',       checked: false, value: '11', pathName: 'ProjectInfo'}, 
            {name: '项目结构',       checked: false, value: '12', pathName: 'ProjectStructure'},
            {name: '国际化',         checked: false, value: '13', pathName: 'International'},
            {name: '阿里矢量图标',    checked: false, value: '14', pathName: 'AliIconFont'},
            {name: '富文本',         checked: false, value: '15', pathName: 'TinymceEditor'}
          ]
        },
        {name: '组件列表', value: '2', checked: false,
          child: [
            {
              name: '基本组件', value: '20', checked: false, pathName: 'ComponentList'
            },
            {
              name: '复制粘贴', value: '21', checked: false, pathName: 'CopyComponent'
            },
            {
              name: '地址选择组件', value: '22', checked: false
            }, 
            {
              name: '表单允许加减组件', value: '23', checked: false
            }, 
            {
              name: '级联选择地址组件', value: '24', checked: false
            }
          ]
        },
        {
          name: '工作爬坑总结', value: '3', checked: false,
            child: [
              {
                name: '日常爬过的坑', value: '31', checked: false
              },
              {
                name: '每日工作心得', value: '32', checked: false
              }
            ]

        },
        {
          name: '前端书籍笔记', value: '4', checked: false,
          child: [
            {
              name: '你不知道的CSS', value: '40', checked: false, pathName: 'CssUnknown'
            },
            {
              name: '红宝书', value: '41', checked: false
            },
            {
              name: '你不知道的Javascript', value: '42', checked: false
            }
          ]
        },
        {
          name: '天文地理', value: '4', checked: false,
          child: [
            {
              name: '快速计算', value: '41', checked: false, pathName: 'Caculation'
            },
            {
              name: '逻辑推理', value: '42', checked: false
            }
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
      let content = this.$globalConst.getShowSideMenuHeight()
      console.log(content)
      return this.$globalConst.getShowSideMenuHeight() + 'px'
    },
    onUnfold (item, index) {
      console.log(item)
      item.checked = !item.checked
      console.log(index)
    },
    activeItem (ele, i) {
      console.log(i)
      for (let ele of this.menuList) {
        for (let element of ele.child) {
          element.checked = false
        }
      }
      ele.checked = true
      this.$router.push({name: ele.pathName})
    }
  }
}
</script>
<style scoped>
  .left-menu-layout {
    background-color: #ffffff;
    float: left;
    overflow: auto;
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