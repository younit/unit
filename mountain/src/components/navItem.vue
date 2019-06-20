<template>
  <div>
    <el-menu 
      :default-active= "active"
      class="el-menu-vertical-demo"
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      :unique-opened="uniqueOpened"
      active-text-color="#ffd04b">
      <div class="txtright menuicon"><i :class="menuicon" @click="handleChangeStatus"></i></div>
      
      <div v-for='item in getmenuList' :key="item.key" >
         <el-menu-item  :index='item.id' v-if="!item.hasChild" @click="rv(item.path)">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>

        <el-submenu :index='item.id' v-if="item.hasChild === true">
           <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
            <el-menu-item v-for="n in item.childrenList" :key="n.key" :index="n.id" @click="rv(n.path)">{{ n.name }}</el-menu-item>
        </el-submenu>
      </div>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 'home',
      isCollapse: false, //  是否水平折叠收起菜单（仅在 mode 为 vertical 时可用 默认vertical
      menuicon: 'el-icon-s-grid',
      uniqueOpened: true, //  是否只保持一个子菜单的展开 默认false
    };
  },
  created() {
    //  设置左侧导航栏选中样式
    this.active = this.$router.app._route.name
  },
  computed: {
    ...mapGetters(['getmenuList']) //  左侧导航列表
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChangeStatus () { //  改变menu状态
      if (this.isCollapse === false) {
        this.isCollapse = true
        this.menuicon = 'el-icon-menu'
      } else {
        this.isCollapse = false
        this.menuicon = 'el-icon-s-grid'
      }
    },
    rv (p) { //  导航跳转
      this.$router.push({ path: '/' + p })
    }
  }
}
</script>

<style lang="stylus" scoped>


  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height 600px
  }
  .menuicon {
    padding 0 10px
    font-size 18px
    color #46a0fc
  }
  .el-submenu .el-menu-item {
    min-width 0
  }
  .menuicon:hover {
    cursor pointer
  }
</style>
