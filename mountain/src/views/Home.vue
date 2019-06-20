<template>
  <div class="home">
    <head-item></head-item>
      <div class="flexstart">
        <div>
          <nav-item></nav-item>
        </div>
        <!-- <keep-alive >
            <router-view class="app-router-view"  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive> -->
        <div>
          <transition name="move-fade-right-to-left">
            <router-view class="app-router-view"></router-view>
          </transition>
        </div>
      </div>
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
