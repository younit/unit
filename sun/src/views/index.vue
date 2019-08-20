<template>
  <div id="ind">
    <van-tabs v-model="active" sticky  @click="hanldeClick">
      <van-tab v-for="item in tab" :title="item.title" :key="item.key">
        
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="items in list.data" :key="items.key" class="list">
            <van-card
              :price="items.price"
              :desc="items.desc"  
              :title="items.name"
              :tag="items.label"
              :thumb="items.img"
            >
              <!-- <div slot="tags">
                <van-tag plain type="danger">{{ items.label }}</van-tag>
              </div> -->
              <div slot="footer">
                <van-button size="mini">想去</van-button>
                <van-button size="mini">去过</van-button>
              </div>
            </van-card>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { product } from '../api'
export default {
  data () {
    return {
      active: 0,
      tab: [
        {
          title: '推荐',
        },
        {
          title: '排行榜',
        },
      ],
      list: {
        data: [],
        total: 0,
      },
      loading: false,
      finished: false,
      para: {
        pageIndex: 1,
        pageSize: 0,
        type: 0, //  0 推荐 1 排行
      },

    }
  },
  methods: {
    hanldeClick (name, title) {
      this.para.type = name
      let list = this.list.data
      if (name === 1) {
        list.sort((a, b) => {
          return b.read - a.read
        })        
      } else {
        list.sort((a, b) => {
          return b.collections - a.collections
        }) 
      }
    },
    onLoad () { //  获取文章列表
      this.para.pageSize = this.para.pageSize + 10
      product(this.para).then(res => {
        console.log(res.data)
        let { code, msg, data, total } = res.data
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          data.sort((a, b) => {
            return b.collections - a.collections
          }) 
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
#ind
  .list
    margin-bottom 10px
    .van-card__content
      padding-top 15px
      min-height  0
    .van-card__footer
      margin-bottom 8px
  .van-list__finished-text
    margin-bottom 60px
</style>

