import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalConst from './utitls/globlaConst' // 全局一些常量
import '@/assets/css/global.css' // 全局样式

import '@/assets/icon/youfanye/iconfont.css'
import '@/assets/icon/xiala/iconfont.css' // 阿里矢量图标
import '@/assets/icon/zuofanye/iconfont.css'
import '@/assets/icon/youfanye/iconfont.css'
import '@/assets/icon/upload/iconfont.css'

import '@/assets/icons/iconfont.css' // 引入项目中的所有的icon

// 引入vue element组件库
import elementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

// 引入vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 引入国际化的预言
import i18n from "./lang/index"
Vue.use(elementUI, {
  size: "small", // element-ui组件的尺寸一共分为large、default、small 、mini
  i18n: (key, value) => i18n.t(key, value)
})



Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
let globalVue = new Vue({
  router,
  // store,
  i18n,
  render: h => h(App)
}).$mount("#app")

window.vm = globalVue