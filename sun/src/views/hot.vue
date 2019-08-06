<template>
  <div id="product">
     <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-for="item in list.data"
        :key="item.key"
        @click="handleToDetail(item)"
        class="list"
      >
        <div class="tag" :class="item.only === true? 'only': 'vip'">{{ item.only === true? '独家': 'VIP' }}</div>
        <div class="list__box">
          <div class="list__box__img">
            <img :src="item.img" alt="">
          </div>
          <div class="info">
            <div class="info__title">{{ item.name }}</div>
            <div class="info__author">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { product } from '../api'
export default {
  data () {
    return {
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
  methods: {
    handleToDetail (val) {
      console.log(val)
    },
    onLoad () { //  获取文章列表
      this.para.pageSize = this.para.pageSize + 10
      product(this.para).then(res => {
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
eight = 8px
#product
  .van-list
    padding eight 0
    margin 0 0 50px 0
    display flex
    flex-wrap wrap
    .list:nth-child(3n+0)
      margin-right eight
    .list
      width 30%
      flex-grow 1
      margin-left eight
      height 28vh
      position relative
      .tag
        position absolute
        letter-spacing 1px
        padding 1px 6px
        border-radius 5px
        font-size 12px
        color #fff
        right eight
        top eight
      .vip
        background-color #FF4500
      .only
        background-color #FF8C00
      &__box
        height 100%
        margin 0 auto
        &__img
          height 70%
          background-color #c1c1c1
          border-radius 5px
          img
            border-radius 5px
            width 100%
            height 100%
      .info
        letter-spacing 1px
        &__title
          font-size 18px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-weight bold
          margin-top: 4px
        &__author
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 14px
          color #666
  .van-list__finished-text
     margin 0 auto
</style>

