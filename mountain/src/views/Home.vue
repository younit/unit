<template>
  <div class="home">
    <head-item></head-item>
    <el-row>
      <el-col :span="4">
          <nav-item></nav-item>
      </el-col>
      <el-col :span="20" class="content">
        <!-- <keep-alive >
            <router-view class="app-router-view"  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive> -->
        <transition name="move-fade-right-to-left">
          <router-view class="app-router-view"></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import headItem from '../components/headItem'
import navItem from '../components/navItem'
export default {
  name: 'home',
  components: {
    headItem,
    navItem
  }
}
</script>
<style lang="stylus" scoped>
.content {
  padding 30px
}
</style>

