
<template>
  <div id="home">

    <van-swipe @change="onChange" :height="swipeConfig.height" :autoplay="swipeConfig.autoplay">
      <van-swipe-item><img src="http://mziu.club/swipe_1.jpeg" alt=""></van-swipe-item>
      <van-swipe-item><img src="http://mziu.club/swipe_2.jpeg" alt=""></van-swipe-item>
      <van-swipe-item><img src="http://mziu.club/swipe_3.jpeg" alt=""></van-swipe-item>
      <van-swipe-item><img src="http://mziu.club/swipe_4.jpeg" alt=""></van-swipe-item>

      <div class="custom-indicator" slot="indicator">
        {{ current + 1 }}/4
      </div>
    </van-swipe>

    <van-tabbar :fixed="false">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
      >
      <div class="list_img">
        {{item}}
      </div>
      <div class="list_desc">
        遇见一场旅行,遇见一场旅行,遇见一场旅行,遇见一场旅行,
      </div>
      </van-cell>
    </van-list>


  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      current: 0,
      swipeConfig: { //  轮播配置
        height: 220,
        autoplay: 2000, //  自动轮播间隔 2s
      },
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    onLoad () {
      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + 1)
      }
      // 加载状态结束
      this.loading = false
      if (this.list.length >= 40) {
        this.finished = true
      }
    }
  },
}
</script>
<style lang="stylus">
  #home {
    .van-swipe {
      position relative
      background-color pink
      img {
        width 100%
      }
    }
    .custom-indicator {
      position absolute
      bottom 0
      right 0
      padding 4px
      color: rgb(192,192,192)
      background-color rgba(0, 0, 0, 0.1)
    }
    .van-tabbar {
      height 12vh
    }
    .van-list {
      padding 8px 0
      .van-cell {
        display inline-block
        width 50%
        height 24vh
        .van-cell__value {
          height 100%
          background-color pink
          .list_img {
            height 70%
            background-color #fff
          }
          .list_desc {
            height 30%
            background-color rgba(0, 0, 0, 0.2)
          }
        }
      }
      .van-cell:nth-child(odd) {
        padding 0px 4px 0 8px
      }
      .van-cell:nth-child(even) {
        padding 0px 8px 0 4px
      }
    }
  }
</style>
