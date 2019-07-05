
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
        v-for="item in list.data"
        :key="item.key"
      >
      <div class="list_img">
        <img :src="item.cover" alt="">
      </div>
      <div class="article">
        <div class="article__title">{{ item.title }}</div>
        <div class="article__author"><van-icon name="manager"/>{{ item.author }}</div>
      </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { articles } from '../api'
export default {
  name: 'home',
  data () {
    return {
      current: 0,
      swipeConfig: { //  轮播配置
        height: 220,
        autoplay: 2000, //  自动轮播间隔 2s
      },
      list: {
        data: [],
        total: 0,
      },
      loading: false,
      finished: false,
      para: {
        pageIndex: 1,
        pageSize: 0,
      },
    }
  },
  mounted() {
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    onLoad () { //  获取文章列表
      this.para.pageSize = this.para.pageSize + 10
      articles(this.para).then(res => {
        console.log(res.data)
        let { code, msg, data, total } = res.data
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.list.data = data
          this.list.total = total
          this.loading = false
          if (this.para.pageSize >= this.list.total) {
            this.finished = true
          }
        }
      })
    }
  },
}
</script>
<style lang="stylus">
  #home {
    .van-cell:not(:last-child)::after {
      border 0 !important
    }
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
      margin 0 0 50px 0
      .van-cell {
        display inline-block
        width 50%
        height 24vh
        margin-top 8px
        .van-cell__value {
          height 100%
          .list_img {
            height 70%
            background-color #fff
            border 1px solid #ccc
            img {
              width 100%
              height 100%
            }
          }
          .article {
            height 30%
            &__title {
              width 100%
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              text-indent 1em
              line-height 2em
              font-size 14px
              color #000
              margin-top: 4px
            }
            &__author {
              text-align right
              margin-right 8px
              .van-icon {
                vertical-align -1px
                margin-right 8px
              }
            }
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
