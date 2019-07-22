<template>
  <div id="navbar">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.go(-1)"/>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    title: String, //  标题
  }
}
</script>
<style lang="stylus" >
#navbar
  .van-nav-bar .van-icon, .van-nav-bar__text
    color #1f1f1f
</style>
