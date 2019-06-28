import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [ //  左侧导航列表
      {
        id: 'home',
        name: '主面板',
        path: 'home',
        hasChild: false,
        icon: 'el-icon-s-platform',
      },
      {
        id: 'city',
        name: '城市管理',
        path: 'city',
        hasChild: true,
        icon: 'el-icon-office-building',
        childrenList: [
          {
            id: 'city',
            name: '城市列表',
            path: 'city',
          },
        ]
      },
      {
        id: 'module',
        name: '模块管理',
        path: 'module',
        hasChild: true,
        icon: 'el-icon-s-operation',
        childrenList: [
          {
            id: 'module',
            name: '模块列表',
            path: 'module',
          },
        ]
      },
    ],
    citys: [ //  所有城市数据
      {
        name: '北京'
      },
      {
        name: '上海'
      }
    ]
  },
  getters: {
    getmenuList: (state) => {
      return state.menuList
    },
    getcitys: (state) => {
      return state.citys
    },
  },
  mutations: {

  },
  actions: {

  }
})
