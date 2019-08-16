<template>
  <div id="setting">
    <div class="setting_head">
      <div>
        <div class="setting_headImg">
          <img :src="form.headImg"  class="setting_Img">
          <div v-if="!islogin">
            <van-button square type="default" to="/login">登录/注册</van-button>
          </div>
        </div>
        <div v-if="islogin" class="setting_name">
            H1, {{ form.name }}
            <br/>
            <span class="desc">世界很大, 遇见你不容易</span>
        </div>
      </div>
      <div class="integral">
        <van-icon name="diamond"/>
        <br/>
        100
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

    <van-cell title="任务中心" is-link to="task"/>
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
      this.islogin = true
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
        let { code, data } = res.data
        if (code === 200) {
          this.form = data[0]
        }
      })
    }
  },
}
</script>

<style lang="stylus">
imgWidth = 75px
#setting {
  background-color #f9f9f9
  min-height 100vh
  .setting_head {
    background-image url('http://mziu.club/mine.jpg')
    background-size 100% 100%
    height 180px
    // text-align center
    padding 20px 30px
    display flex
    justify-content space-between
  }
  .setting_headImg {
    width imgWidth
    height imgWidth
    background-color #fff
    border-radius 50px
    display inline-block
    border 1px solid #ffc
    .setting_Img {
      max-width none
      height 100%
      border-radius 50px
      width: imgWidth;
    }
    .van-button--normal {
      padding 0 10px
      font-size 12px
    }
  }
  .setting_name {
    margin 20px 0 0 10px
    display inline-block
    vertical-align top
    font-size 16px
    color #1f1f1f
    .desc {
      color #666
      font-size 14px
    }
  }
  .integral {
    display inline-block
    vertical-align top
    margin 15px 0 0 0px
    color #FF8C00
    .van-icon-diamond {
      color #FF4500
      margin-left 7px
    }
  }
  .van-tabbar {
    width: 90%;
    margin: 0 auto;
    margin-top: -60px;
    border-radius: 8px;
    padding: 30px 0;
    margin-bottom 30px
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

