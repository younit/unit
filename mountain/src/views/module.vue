<template>
  <div>
    <el-upload
      class="avatar-uploader"
      ref="upload"
      action="https://upload-z2.qiniup.com"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button  @click="submitUpload">上传到服务器</el-button>
  </div>
</template>

<script>
import { qiniuupload } from '../api'
export default {
  data () {
    return {
      imageUrl: '',
      form: {
        img: ''
      }
    }
  },
  methods: {
    submitUpload () {
      let para = new URLSearchParams((this.form))
      qiniuupload(para).then(res => {
        console.log(res)
      })
    },
    handleChange (file, fileList) {
      const _this = this
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw) // 图片预览
      let reader = new FileReader() //  生成文件读取
      reader.readAsDataURL(file.raw) //  转化文件数据流链接
      reader.onload = function () {
        _this.form.img = reader.result //  拿到base64结果
        console.log(_this.form.img)
      }
      // this.getImgToBase64(file.raw).then(res => {
      //   console.log(res)
      // })
    },
    getImgToBase64 (file) {
      return new Promise(function (resolve, reject)  {
        let reader = new FileReader()
        let imgs = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgs = reader.result
        }
        reader.onerror = error => {
          reject(error)
        }
        reader.onloadend = () => {
          resolve(imgs)
        }
      })
    },
  },
  mounted() {
    
  },
}
</script>
<style>
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
</style>

