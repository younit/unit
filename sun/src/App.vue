<template>
  <div id="app">
   
    <keep-alive >
        <router-view class="app-router-view"  v-if="$route.meta.keepAlive"/>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"/>
    <nav-item></nav-item>
  </div>
</template>
<script>
import navItem from './components/navItem'
export default {
  components: {
    navItem
  },
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
* {
  padding 0
  margin 0
}
.txtcolor {
  color #66d8da
}
.txtcenter {
  text-align center
}
.bgcolor {
  background-color #66d8da
}
</style>
