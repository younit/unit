<template>
  <div id="navItem">
    <van-tabbar 
    v-model="active"
    active-color="#66d8da"
    inactive-color="#000">
      <van-tabbar-item 
      v-for="item in list" 
      :key="item.key" 
      :icon="active === item.path ? item.active_icon : item.icon" 
      :name="item.path" 
      :info="item.info" 
      :dot="item.dot" 
      :to="'/'+item.path">
        <span>{{ item.part }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'navItem',
  data () {
    return {
      active: 'home',
      list: [
        {
          part: '首页',
          icon: 'fire-o',
          active_icon: 'fire',
          path: 'home',
          dot: true,
        },
        {
          part: '坐标',
          icon: 'location-o',
          active_icon: 'location',
          path: 'location',
          dot: false,
          info: 99,
        },
        {
          part: '热点',
          icon: 'hot-o',
          active_icon: 'hot',
          path: 'hot',
          dot: false,
          info: 5,
        },
        {
          part: '设置',
          icon: 'setting-o',
          active_icon: 'setting',
          path: 'setting',
          dot: false,
          info: 11,
        },
      ],
    }
  },
  methods: {
  },
}
</script>

<style lang="stylus">
#navItem {
  .van-tabbar {
    min-height 8vh
    .van-tabbar-item {
      font-size 14px
      .van-tabbar-item__icon {
        font-size 24px
      }
    }
  }
}
</style>

