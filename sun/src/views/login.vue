<template>
  <div class="login">
    
    <div class="box">
      <van-cell-group>
        <van-field
          v-model="form.phone"
          label="用户名"
          placeholder="请输入用户名"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="form.pwd"
          label="密码"
          type="password"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div class="btns">
        <van-button square type="info" to="/reg">注册</van-button>
        <van-button square type="primary" @click="dologin">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { userslogin } from '../api'
export default {
  name: 'login',
  data () {
    return {
      form: {}
    }
  },
  created() {
    
  },
  methods: {
    dologin () {
      let para = new URLSearchParams(this.form)
      userslogin(para).then(res => {
        console.log(res)
        let { code, msg, data } = res
        if (code === 200) {
          localStorage.setItem('user', data[0]._id)
          this.$router.push( {path: '/setting'} )
        } else {
          this.$toast.fail(msg)
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.box {
  width 80%
  height 40vh
  position absolute
  top 30vh
  margin-left 10%
  .van-cell-group {
    margin 20px auto
    border-radius 5px
    .van-field {
      padding 15px
      border-radius 5px
    }
  }
  .btns {
    display flex
    justify-content space-between
    margin-top 20px
    .van-button {
      padding 0 40px
    }
  }
}
.login {
  background-image url('http://mziu.club/loginbg.jpeg')
  background-size 100% 100%
  min-height 100vh
}
</style>

