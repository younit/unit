import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [ //  左侧导航列表
      {
        id: '1',
        name: '主面板',
        path: 'home',
        hasChild: false,
        icon: 'el-icon-s-platform',
      },
      {
        id: '2',
        name: '城市管理',
        path: 'city',
        hasChild: true,
        icon: 'el-icon-office-building',
        childrenList: [
          {
            id: '2-1',
            name: '上海',
            path: 'shanghai',
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
