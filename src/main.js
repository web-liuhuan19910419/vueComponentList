import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalConst from './utitls/globlaConst' // 全局一些常量
import storage from '@/storage/storage'

import '@/assets/icons/iconfont.css' // 引入项目中的所有的icon

// 引入vue element组件库
import ElementUI from "element-ui"
import elementVar from '@/styles/element-variables.scss'
import normalVar from '@/styles/variables.scss'
import '@/styles/index.scss' // global css

// 引入vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 引入国际化的预言
import i18n from "./lang/index"
Vue.use(ElementUI, { size: storage.getStorage('wms_size') || 'mini', zIndex: 9000 })



Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
let globalVue = new Vue({
  router,
  // store,
  i18n,
  render: h => h(App)
}).$mount("#app")

window.vm = globalVue