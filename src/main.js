import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/base.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import customMenu from '@/directive/index.js'
Vue.use(customMenu)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
