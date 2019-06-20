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
    ]
  },
  getters: {
    getmenuList: (state) => {
      return state.menuList
    },
  },
  mutations: {

  },
  actions: {

  }
})
