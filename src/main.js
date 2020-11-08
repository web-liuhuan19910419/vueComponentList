import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalConst from './utitls/globlaConst' // 全局一些常量
import '@/assets/css/global.css' // 全局样式
import '@/assets/icon/xiala/iconfont.css' // 阿里矢量图标
import '@/assets/icon/zuojiantou/iconfont.css'
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

// 引入富文本编辑器
import VueTinymce from "@packy-tang/vue-tinymce"
 //安装组件
Vue.use(VueTinymce)


Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
new Vue({
  router,
  // store,
  i18n,
  render: h => h(App)
}).$mount("#app")
