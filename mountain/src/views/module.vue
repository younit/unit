<template>
  <div>
    <el-upload
      class="upload-demo"
      :data="qiniu"
      ref="upload"
      action="https://upload-z2.qiniup.com"
      :show-file-list="true"
      :multiple="false"
      :file-list="fileList.articles"
      :auto-upload="false"
      :before-upload="(file) => {return handleBeforeUpload(file, 'articles')}"
      :on-success="(response, file, fileList) => { return handleOnSuccess(response, file, fileList, 'articles') }"
      :on-remove="(file, fileList) => { return handleOnRemove(file, fileList, 'articles') }"
    >
    <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>


    <div>

      <input type="file" @change="getFile" ref="file" id="file">

    </div>
  </div>
</template>

<script>
import { qiniutoken } from '../api'
import moment from 'moment'
export default {
  data () {
    return {
      fileList: {
        articles: []
      },
      qiniu: { //  七牛上传
        token: '',
        key: '',
        uploadUrl: '', //  上传地址前缀
      },
      form: {
        imglist: []
      }
    }
  },
  mounted() {
    this.getqiniutoken()
  },
  methods: {

    getFile (e) {
      console.log(e)
        let _this = this
        var files = e.target.files[0]
        console.log(files)
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          console.log(this.result)
          _this.src = this.result
        }
      }

    ,  
    getqiniutoken () {
      let para = {
        bucket: 'huaxiaohong'
      }
      qiniutoken(para).then(res => {
        console.log(res)
        let { code, data, msg } = res.data
        if (code === 200) {
          this.qiniu.token = data.token
          this.qiniu.uploadUrl = data.url
          console.log(this.qiniu)
        } else {
          this.$message(msg)
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleBeforeUpload (file, type) { //  上传之前
      this.qiniu.key = ``+ type +`${moment().format('YYYYMMDDHHmmSSS')}${Number.parseInt(Math.random() * 1000, 10)}.${file.type.split('/')[1]}`
    },
    handleOnSuccess (response, file, fileList, type) { //  上传成功之后
      let url = this.qiniu.uploadUrl + '/' + response.key
      this.form[type] =  url
    
      // this.fileList[type].push({ //  显示文件
      //   name: response.key,
      //   url: url
      // })
      console.log(this.form)
    },
    handleOnRemove (file, fileList, type) { //  删除
      // this.fileList[type] = []
      console.log(file, fileList)
    },
  },
}
</script>

<style>

</style>
