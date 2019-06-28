<template>
  <div class="reg">
    
    <div class="box">

      <van-cell-group>
        <van-field
          readonly
          clickable
          label="手机号"
          :value="form.phone"
          :required='true'
          @touchstart.native.stop="show = true"
        />
        <van-number-keyboard
          v-model="form.phone"
          :show="show"
          :maxlength="11"
          close-button-text="完成"
          @blur="show = false"
        />
      </van-cell-group>

      <van-cell-group>
        <van-field
          v-model="form.pwd"
          label="密码"
          type="password"
          :required='true'
          placeholder="请输入密码"
        />
      </van-cell-group>

      <van-cell-group>
        <van-field
          v-model="form.repwd"
          label="确认密码"
          type="password"
          :required='true'
          placeholder="请确认密码"
        />
      </van-cell-group>

      <div class="btns">

        <van-button size="large" type="info" @click.native="reg">注册</van-button>
        <router-link to="/login" class="tologin">已有账号？去登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { usersadd } from '../api'
export default {
  name: 'reg',
  data () {
    return {
      show: false, //  控制键盘显示
      form: {},
    }
  },
  methods: { //  注册方法
    reg () {
     
      if (!this.form.phone && this.form.length !== 11) {
        this.$toast.fail('请输入11位手机号')
      } else
      if (!this.form.pwd) {
        this.$toast.fail('请输入密码')
      } else
      if (this.form.repwd !== this.form.pwd) {
        this.$toast.fail('重复密码不一致')
      } else {
        this.form.role = 'ordinary'
        let para = new URLSearchParams(this.form)
        usersadd(para).then(res => {
          let { code, msg } = res
          if (code === 200) {
            this.$dialog.confirm({
              title: '提示',
              message: '注册成功, 是否跳转登录界面'
            }).then( () => {
              this.$router.push({ path: '/login' })
            }).catch(() => {
            })
          } else {
            this.$toast('注册失败')
          }
        })
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.box {
  width 80%
  min-height 40vh
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
    margin-top 20px
    .tologin {
      text-align right 
      margin-top 20px
      color #666
      text-decoration underline
      display block
    }
  }
}
.reg {
  background-image url('http://mziu.club/loginbg.jpeg')
  background-size 100% 100%
  min-height 100vh
}
</style>

