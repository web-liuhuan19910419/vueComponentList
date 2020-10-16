import Vue from 'vue'
import App from './App.vue'
import globalConst from './utitls/globlaConst' // 全局一些常量
import '@/assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$globalConst = globalConst
new Vue({
  render: h => h(App),
}).$mount('#app')
