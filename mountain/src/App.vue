<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
* {
  margin 0
  padding 0
}
.flexbtw {
  display flex
  justify-content space-between
}
.flexstart {
  display flex
  justify-content flex-start
}
.txtleft {
  text-align left
}
.txtcenter {
  text-align center
}
.txtright {
  text-align right
}
.el-menu {
  border-right none !important 
}
.marginbtm30 {
  margin-bottom 30px
}
.el-form-item__content { //  输入框样式
  display inline-block !important
  margin-left 10px !important
}
</style>
