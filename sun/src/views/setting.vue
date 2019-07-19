<template>
  <div id="setting">
    <div class="setting_head">
      <div v-if="islogin">
          hello, {{ uid }}
      </div>

      <div v-if="!islogin">
       <van-button square type="default" to="/login">登录/注册</van-button>
      </div>
    </div>

    <van-tabbar 
    active-color="red"
    :fixed="false"
    inactive-color="pink">
      <van-tabbar-item 
      v-for="item in list" 
      :key="item.key" 
      :icon="item.active_icon" 
      :name="item.path" 
      :info="item.info" 
      :dot="item.dot" 
      :to="'/'+item.path">
        <span class="part">{{ item.part }}</span>
      </van-tabbar-item>
    </van-tabbar>

    <van-cell title="任务中心" is-link/>
    <van-cell title="我的收藏" is-link/>
     
    <van-cell title="设置" is-link to="setup"/>
    
  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      islogin: false,
      uid: '',
      list: [
        {
          part: '打卡',
          icon: 'label-o',
          active_icon: 'label',
          path: 'label',
          dot: true,
        },
        {
          part: '喜欢',
          icon: 'like-o',
          active_icon: 'like',
          path: 'like',
          dot: false,
          info: '',
        },
        {
          part: '勋章',
          icon: 'medel-o',
          active_icon: 'medel',
          path: 'medel',
          dot: false,
          info: '',
        },
      ],
    }
  },
  created (){
    let user = localStorage.getItem('user')
    console.log(user)
    if (user) {
      this.islogin = true
      this.uid = user
    } else {
      this.islogin = false
    }
  },
}
</script>

<style lang="stylus">
#setting {
  min-height 100vh
  .setting_head {
    background-image url('http://mziu.club/setting_head.jpeg')
    background-size 100% 100%
    height 220px
  }
  .van-tabbar {
    margin 50px 0
    .van-tabbar-item__icon {
      font-size 40px
    }
    .part {
      font-size 18px
      display inline-block
      margin-top 8px
    }
  }
  .van-hairline--top-bottom::after {
    border 0
  }
}
</style>

