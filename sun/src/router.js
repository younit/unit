import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('./views/home.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true
      },
      component: () => import('./views/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('./views/location.vue')
    },
    {
      path: '/hot',
      name: 'hot',
      component: () => import('./views/hot.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/setting.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('./views/reg.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/article.vue')
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('./views/setup.vue')
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('./views/task.vue')
    },
  ]
})
