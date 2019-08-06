<template>
  <div id="setup">
    <nav-bar title="设置"></nav-bar>
    <div class="cells">
      <van-cell title="修改昵称" is-link @click="handleSet('修改昵称')"/>
      <van-cell title="修改头像" is-link @click="handleSet('修改头像')"/>
      <van-cell title="切换用户" is-link @click="handleSet('切换用户')"/>
    </div>

    <van-dialog v-model="show" :title="currentStatus" show-cancel-button @confirm="handleSuccess">

      <van-cell-group v-if="currentStatus === '修改昵称'">
        <van-field v-model="form.name" placeholder="请输入用户名" />
      </van-cell-group>

      <div v-if="currentStatus === '修改头像'">
        <el-upload
          class="avatar-uploader"
          :data="qiniu"
          ref="upload"
          action="https://upload-z2.qiniup.com"
          :show-file-list="false"
          :before-upload="(file) => {return handleBeforeUpload(file, 'headImg')}"
          :on-success="(response, file, fileList) => { return handleOnSuccess(response, file, fileList, 'headImg') }">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <van-cell-group v-if="currentStatus === '切换用户'">
       确认切换用户
      </van-cell-group>

    </van-dialog>

  </div>
</template>
<script>
import navBar from "../components/navBar"
import { usersupdate, qiniutoken } from '../api'
import moment from 'moment'
export default {
  data() {
    return {
      form: { //  表单
        _id: '',
        name: '',
        headImg: '',
      },
      show: false,
      dialog: { //  弹出框配置
        title: ''
      },
      imageUrl: '',
      currentStatus: '当前操作状态',
      qiniu: { //  七牛上传
        token: '',
        key: '',
        uploadUrl: '', //  上传地址前缀
      },
    }
  },
  components: {
    navBar,
  },
  created() {
  },
  methods: {
    getqiniutoken () { //  拿到七牛的token
      let para = {
        bucket: 'huaxiaohong'
      }
      qiniutoken(para).then(res => {
        console.log(res)
        let { code, data, msg } = res.data
        if (code === 200) {
          this.qiniu.token = data.token
          this.qiniu.uploadUrl = data.url
        } else {
          this.$message(msg)
        }
      })
    },
   handleSet (val) {
     this.form = {}
     this.currentStatus = val
     switch (val) {
      case '修改昵称':
        this.show = true
        break
      case '修改头像':
        this.getqiniutoken()
        this.show = true
        break
      case '切换用户':
        this.show = true
        break
     }
   },
   handleSuccess () {
     this.form._id = localStorage.getItem('user')
     console.log(this.currentStatus)
     switch (this.currentStatus) {
      case '修改昵称':
        this.postUpdate()
        this.show = false
        break
      case '修改头像':
        this.postUpdate()
        this.show = false
        break
      case '切换用户':
        this.show = false
        this.$router.push({ path: '/login' })
        localStorage.removeItem('user')
        break
     }
   },
   handleBeforeUpload (file, type) { //  上传之前
    this.loading = true
    this.qiniu.key = ``+ type +`${moment().format('YYYYMMDDHHmmSSS')}${Number.parseInt(Math.random() * 1000, 10)}.${file.type.split('/')[1]}`
   },
   handleOnSuccess (response, file, fileList, type) { //  上传成功之后
    this.form.headImg = this.qiniu.uploadUrl + '/' + response.key
    this.imageUrl = URL.createObjectURL(file.raw)
    console.log(this.form.headImg)
   },
   postUpdate () { //  更新
    let para = new URLSearchParams(this.form)
    usersupdate(para).then(res => {
      console.log(res)
      let { code, data, msg } = res
      if (code === 200) {
        this.$toast.success(msg)
      } else {
        this.$toast.fail(msg)
      }
    })
   }
  },
}
</script>
<style lang="stylus">
#setup{
  .avatar-uploader {
    text-align center
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .van-dialog__header {
    padding 15px 0
  }
  .van-dialog__content {

  }
  .van-cell-group {
    line-height 5
    text-align center
    .van-cell {
      line-height 3
    }
  }
}

</style>
