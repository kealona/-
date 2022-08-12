import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import VueSocketIO from 'vue-socket.io'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(Element)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8888'
}))

Vue.use(VueLazyload, {
	loading: '../assets/card1.jpg'
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
