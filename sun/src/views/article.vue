<template>
  <div id="articles">
    <!-- 文章详情页 -->
    <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>
    <div class="txtcenter">{{ article.title }}</div>
    <div class="info">
      <span>发布时间: {{ ftime(article.date) }}</span> | 
      <span>作者: {{ article.author }}</span>
    </div>
    <div class="line"></div>
    <div class="content" ref="content"></div>
  </div>
</template>
<script>
import { articlesdetail } from '../api'
import utils from '../utils'
export default {
  name: 'articles',
  data () {
    return {
      loading: true,
      article: '',
    }
  },
  created () {
    let para = this.$router.app._route.query
    console.log(para)
    this.getDetail(para)
  },
  mounted () {
    let r = this.ftime("1563351588408")
    console.log(r)
  },
  methods: {
    getDetail (para) {
      articlesdetail(para).then(res => {
        console.log(res)
        let { data, code, msg } = res.data
        if (code === 200) {
          this.loading = false
          this.article = data[0]
          this.$refs.content.innerHTML = data[0].content
        } else {
          this.$notify(msg)
          this.loading = false
        }
      })
    },
    ftime (time) {
      return utils.formatterTime(time)
    }
  }
}
</script>
<style lang="stylus">
#articles
  .info
    font-size 12px
    text-align right 
    margin-right 8px
    color #999
  .txtcenter 
    margin 10px 0
  .line
    border-bottom 1px solid #ccc
    margin 10px 0
  .content
    margin-bottom 70px
  p 
    margin 8px 0
    line-height 2em
    font-size 14px
    padding 8px
  img 
    width 100%
</style>

