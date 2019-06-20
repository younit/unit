<template>
  <div id="login">
    <div class="login__bg"><img src="https://index.cuican520.com/xm-bg.png" alt=""></div>
    <el-form :model="form" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <!-- <h3 class="title"><i class="cuicanLogo"></i><span>琅粤后台管理</span></h3> -->
      <el-form-item prop="name">
        <el-input type="text" v-model="form.name" auto-complete="off" placeholder="账号" class="inputstyls">
          <template slot="prepend">
            <img src="../../public/user.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="form.pwd" auto-complete="off" placeholder="密码" class="inputstyls">
          <template slot="prepend">
            <img src="../../public/pwd.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button type="primary" class="btnstyls" native-type="submit"  @click.native.prevent="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
   <div class="myfoot">copyright @2018-2019</div>
  </div>
</template>
<script>
import { userslogin } from '../api'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      form: {
        name: '',
        pwd: ''
      },
      rules2: {
        name: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    // handleReset2 () {
    //   this.$refs.ruleForm2.resetFields()
    // },
    handleSubmit () {
      let para = new URLSearchParams(this.form)
      userslogin(para).then(data => {
        console.log(data)
        let { msg, code, user } = data
        if (code !== 200) {
          this.$message({
            message: '用户名或者密码错误',
            type: 'error'
          })
        } else {
          sessionStorage.setItem('user', data.data[0].name)
          this.$router.push({ path: '/home' })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#login 
    .login__bg
      img
        width 100%
    .el-input-group__append, .el-input-group__prepend
    border-right none
    img
      width 16px
    input
      border-left none
    .el-input::-webkit-scrollbar-thumb
      background-color #fff
    .btnstyls
      background-color #032e46
      border-color #032e46
      width 100%
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin 0 auto 
    margin-top 100px
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    height 280px
  }
.el-form-item
  margin-bottom 40px
.myfoot
    width: 100%;
    // position absolute
    bottom 20px
    text-align center
    padding-bottom 0
</style>