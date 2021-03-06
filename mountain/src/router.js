import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('./views/login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/home',
      name: 'system',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/system.vue')
        }
      ]
    },
    {
      path: '/city',
      name: 'citys',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/city',
          name: 'city',
          component: () => import('./views/city.vue')
        }
      ]
    },
    {
      path: '/module',
      name: 'modules',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/module',
          name: 'module',
          component: () => import('./views/module.vue')
        }
      ]
    },
    {
      path: '/article',
      name: 'articles',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/article',
          name: 'article',
          component: () => import('./views/article.vue')
        }
      ]
    },
    {
      path: '/product',
      name: 'products',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/product',
          name: 'product',
          component: () => import('./views/product.vue')
        }
      ]
    },
    {
      path: '/task',
      name: 'tasks',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/task',
          name: 'task',
          component: () => import('./views/task.vue')
        }
      ]
    },
  ]
})
