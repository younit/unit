<template>
  <div id="setting">
    <div class="setting_head">
      <div class="setting_headImg">
        <img :src="form.headImg"  class="setting_Img">
        <div v-if="!islogin">
          <van-button square type="default" to="/login">登录/注册</van-button>
        </div>
      </div>
      <div v-if="islogin" class="setting_name">
          {{ form.name }}
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
import { users } from '../api'
export default {
  name: 'setting',
  data () {
    return {
      islogin: false,
      user: '',
      form: {},
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
  created() {
    let id = localStorage.getItem('user')
    if (id) {
      this.getInfo()
    } else {
      this.islogin = false //  去登录
    }
  },
  mounted () {
  },
  methods: {
    getInfo () {
      let para = {
        '_id': localStorage.getItem('user')
      }
      users(para).then(res => {
        console.log(res)
        let { code, msg, data } = res.data
        if (code === 200) {
          this.islogin = true
          this.form = data[0]
        }
      })
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
    text-align center
  }
  .setting_headImg {
    width 100px
    height 100px
    background-color #fff
    border-radius 50px
    margin 0 auto
    display inline-block
    margin-top 60px
    border 1px solid #ffc
    .setting_Img {
      max-width none
      height 100%
      border-radius 50px
    }
  }
  .setting_name {
    color #ffc
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

