<template>
  <div class="login">
    
    <div class="box">
      <van-cell-group>
        <van-field
          v-model="form.name"
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
        <van-button square type="info">注册</van-button>
        <van-button square type="primary">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {}
    }
  }
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

