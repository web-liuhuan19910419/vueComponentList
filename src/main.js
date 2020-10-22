import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalConst from './utitls/globlaConst' // 全局一些常量
import '@/assets/css/global.css' // 全局样式
import '@/assets/icon/xiala/iconfont.css' // 阿里矢量图标
import '@/assets/icon/zuojiantou/iconfont.css'


Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
new Vue({
  router,
  // store,
  // i18n,
  render: h => h(App)
}).$mount("#app")
