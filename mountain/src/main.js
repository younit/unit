import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

// router.beforeEach((to, from, next) => { //  登入之前检测
//   if (to.path === '/login') {
//     sessionStorage.removeItem('user')
//   }
//   // let user = JSON.parse(sessionStorage.getItem('user'))
//   let user = sessionStorage.getItem('user')
//   if (!user && to.path !== '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
