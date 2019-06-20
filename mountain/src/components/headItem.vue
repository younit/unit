I<template>
  <div class="headItem flexbtw">
      <div class="grid-content bg-purple-dark" style="padding-left: 20px">
        后台管理系统
      </div>
      <div class="grid-content bg-purple-dark">
        <div>
          <span>欢迎您, {{ msg }} </span>
          <el-divider direction="vertical"></el-divider>
          <span  @click="signOut" class="handlehover">退出</span>
        </div>
      </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'headItem',
  data () {
    return {
      msg: '',
    }
  },
  mounted () {
    let user = sessionStorage.getItem('user')
    this.msg = user
  },
  methods: {
    signOut () {
      this.$router.push({ path: '/login' })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style style lang="stylus" scoped>
.headItem
  line-height 4em
  background-color: #545c64
  padding 0 30px
.grid-content {
    min-height: 50px;
  }
.bg-purple-dark {
  /* background-color: rgb(84, 92, 100); */
  
  color #fff
}
.handlehover:hover
  cursor pointer
  text-decoration underline
</style>
