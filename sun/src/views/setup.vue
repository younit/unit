<template>
  <div id="setup">
    <nav-bar title="设置"></nav-bar>
    <div class="cells">
      <van-cell title="修改昵称" is-link @click="handleSet('修改昵称')"/>
      <van-cell title="修改头像" is-link @click="handleSet('修改头像')"/>
      <van-cell title="切换用户" is-link @click="handleSet('切换用户')"/>
    </div>
    
    <el-dialog :visible.sync="show" :title="currentStatus" width="80%" center>
      
      <van-cell-group v-if="currentStatus === '修改昵称'">
        <van-field v-model="form.name" placeholder="请输入用户名" />
      </van-cell-group>
      <div v-if="currentStatus === '修改头像'">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          
          action="https://upload-z2.qiniup.com"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <van-cell-group v-if="currentStatus === '切换用户'">
       确认切换用户
      </van-cell-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="handleSuccess" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import navBar from "../components/navBar"
import { usersupdate, qiniuupload } from '../api'
import utils from '../utils'
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
      fullscreenLoading: false,
    }
  },
  components: {
    navBar,
  },
  created() {
  },
  methods: {
   handleSet (val) {
     this.form = {}
     this.currentStatus = val
     switch (val) {
      case '修改昵称':
        this.show = true
        break
      case '修改头像':
        this.imageUrl = ''
        this.show = true
        break
      case '切换用户':
        this.show = true
        break
     }
   },
   handleSuccess () {
     this.form._id = localStorage.getItem('user')
     switch (this.currentStatus) {
      case '修改昵称':
        this.postUpdate()
        this.show = false
        break
      case '修改头像':
        const _this = this
        let para = new URLSearchParams((this.form))
        this.fullscreenLoading = true
        qiniuupload(para).then(res => {
          console.log(res)
          let { msg, code, data, url } = res
          if (code === 200) {
            this.form.img = ''
            let { key, hash } = data
            console.log(key)
            _this.form.headImg = url + key
            this.postUpdate()
          }
        })
        
        break
      case '切换用户':
        this.show = false
        this.$router.push({ path: '/login' })
        localStorage.removeItem('user')
        break
     }
   },
   handleChange (file, fileList) {
    const _this = this
    utils.getImgToBase64(file).then(res => {
      console.log(res)
      _this.imageUrl = res.imageUrl
      _this.form.img = res.img
    })
    
  },
   postUpdate () { //  更新
    const _this = this
    let para = new URLSearchParams(this.form)
    usersupdate(para).then(res => {
      console.log(res)
      let { code, data, msg } = res
      if (code === 200) {
        this.fullscreenLoading = false
        this.$toast.success(msg)
        _this.show = false
      } else {
        this.fullscreenLoading = false
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
