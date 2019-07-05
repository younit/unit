<template>
  <div id="articles">
    <div v-show="!preview">
      <template v-if="show === 'list'">
        <div class="txtright marginbtm30">
          <el-button type="info" @click="handleSet('add', {})">发布文章</el-button>
        </div>
        <el-table
          :data="list.data"
          style="width: 100%">

          <el-table-column label="标题">
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>

          <el-table-column label="作者">
            <template slot-scope="scope">{{ scope.row.author }}</template>
          </el-table-column>

          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>

          <el-table-column label="喜欢">
            <template slot-scope="scope">{{ scope.row.likes }}</template>
          </el-table-column>

          <el-table-column label="评分">
            <template slot-scope="scope">{{ scope.row.score }}</template>
          </el-table-column>

          <el-table-column label="操作" min-width="90">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="error"
                @click="handleSet('info', scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleSet('edit', scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleSet('delete', scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="txtcenter">
          <el-pagination
            background
            layout="total, prev, pager, next"
            @current-change="(value) => {return handleSearch('pagination', value)}"
            :current-page="para.pageIndex"
            :total="list.total">
          </el-pagination>
        </div>
      </template>

      
      <template v-if="show !== 'list'" v-loading="loading">
        <div class="articles__btn">
          <el-button type="info" @click="handleSet('back', null)" >返回</el-button>
          <el-button type="error" @click="handleSet('preview', {})">预览</el-button>
          <el-button type="success" @click="handleSubmit" >发布</el-button>
        </div>
        <div class="articles__title">
          <el-input ref="myinput" placeholder="请输入标题" v-model="form.title " clearable></el-input>
        </div>
        <quill-editor 
          v-model="form.content"
          ref="myQuillEditor"
          :options="editorOption"
        >
        </quill-editor>
      </template>

    </div>

    <!-- :on-change="(file, fileList) => { return handleOnChange(file, fileList, 'articles') }" -->
    <div v-show="false">
      <el-upload
        class="upload-demo"
        :data="qiniu"
        ref="upload"
        action="https://upload-z2.qiniup.com"
        :show-file-list="true"
        :multiple="false"
        :file-list="fileList.articles"
        :auto-upload="true"
        :before-upload="(file) => {return handleBeforeUpload(file, 'articles')}"
        :on-success="(response, file, fileList) => { return handleOnSuccess(response, file, fileList, 'articles') }"
        :on-remove="(file, fileList) => { return handleOnRemove(file, fileList, 'articles') }"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>


    <div v-show="preview">
      <div class="articles__btn">
        <el-button type="info" v-if="show === 'info'" @click="handleSet('back', null)" >返回</el-button>
        <el-button type="info" v-if="show === 'preview'" @click="handleSet('backedit', null)" >返回</el-button>
        <el-button type="success" v-if="show === 'preview'" @click="handleSubmit" >发布</el-button>
      </div>
      <div class="articles">
        <div class="articles__title">{{ form.title }}</div>
        <div class="articles__info">
          <span>作者: {{ form.author }}</span>
          <span>时间: {{ form.date }}</span>
        </div>
        <div class="articles__content" ref="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 文章: 添加, 列表, 编辑, 删除
 * 七牛token
 */
import { 
  articlesadd, articleslist, articlesedit, articlesdelete, 
  qiniutoken
} from '../api'
import utils from '../utils/index'
import moment from 'moment'
export default {
  name: '',
  data () {
    return {
      loading: false,
      preview: false, //  预览
      editorOption: { //  编辑器配置
        placeholder: '移动端将选取第一张图作为封面图(宽高比例 1.3 : 1)',
        theme: 'snow',
        modules: {
          toolbar: {
            container: utils.toolbarOptions,
            handlers: {
              'image': value => {
                if (value) {
                  document.querySelector('.upload-demo input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      show: '', //  默认显示列表
      currentSetStatus: '', //  当前的操作状态
      list: { //  用户信息
        data: [], //  数据
        total: 0 //  总数
      },
      para: { //  查询条件
        pageIndex: 1,
        pageSize: 10,
      },
      form: {
        title: '',
        content: ``
      },
      fileList: {
        articles: []
      },
      qiniu: { //  七牛上传
        token: '',
        key: '',
        uploadUrl: '', //  上传地址前缀
      },
    }
  },
  computed: {
  },
  mounted() {
    this.show = 'list'
    this.getarticleslist()
    this.getqiniutoken()
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
    handleBeforeUpload (file, type) { //  上传之前
      this.loading = true
      this.qiniu.key = ``+ type +`${moment().format('YYYYMMDDHHmmSSS')}${Number.parseInt(Math.random() * 1000, 10)}.${file.type.split('/')[1]}`
    },
    handleOnSuccess (response, file, fileList, type) { //  上传成功之后
      let url = this.qiniu.uploadUrl + '/' + response.key
      //  获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      if (response) {
        // 获取光标所在位置
        this.loading = false
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('error')
      }
    },
    handleOnRemove (file, fileList, type) { //  删除
      console.log(file, fileList)
    },
    handleSearch (obj, val) { //  查询数据列表 obj: 对象, val: 值
      switch (obj) {
        case 'pagination': //  分页
          this.para.pageIndex = val
          this.getarticleslist()
          break
      }
    },
    handleOnChange (file, fileList, type) { //  图片本地预览
      console.log(file, fileList)
      this.getUrl(file.raw)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    getUrl (files) { //  图片本地预览
      let reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      let quill = this.$refs.myQuillEditor.quill
      reader.onloadend = function () {
         console.log(this.result)
        if (this.result) {
          // 获取光标所在位置
          let length = quill.getSelection().index
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', this.result)
          // 调整光标到最后
          quill.setSelection(length + 1)
        } else {
          this.$message.error('error')
        }
      }
    },
    getarticleslist () { //  查询列表
      articleslist(this.para).then(res => {
        console.log(res)
        let { code, msg, data, total } = res.data
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.list.data = data
          this.list.total = total
        }
      })
    },
    handleSet (obj, row) { //  根据不同状态处理对应事件
      console.log(obj, row)
      this.show = obj
      switch (obj) {
        case 'add':
          this.form = {}
          this.currentSetStatus = 'add'
          break
        case 'back':
          this.show = 'list' //  显示列表界面
          this.preview = false //  隐藏预览界面
          break
        case 'backedit':
          this.preview = false
          this.show = 'add'
          break
        case 'preview':
          this.$refs.content.innerHTML = this.form.content
          this.preview = true
          break
        case 'info':
          this.form = row
          this.$refs.content.innerHTML = this.form.content
          this.preview = true
          break
        case 'edit':
          this.form = row
          this.currentSetStatus = 'edit'
          break
        case 'delete':
          this.show = 'list'
          this.$confirm('此操作将删除该数据是否继续?', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'danger'
          }).then(() => {
            this.form._id = row._id
            let para = new URLSearchParams(this.form)
            articlesdelete(para).then(res => {
              let { code, msg } = res
              if (code === 200) {
                this.$message.success(msg)
                this.getarticleslist()
              } else {
                this.$message.error(msg)
              }
            })
          }).catch(() => {
            this.$message.info('已取消')
          })
          break
      }
    },
    handleSubmit () { //  发布文章
      if (this.form.title === '' || !this.form.title) {
        this.$message.error('标题不能为空')
      } else {
        this.form.author = sessionStorage.getItem('user')
        this.form.uid = sessionStorage.getItem('uid')
        this.form.date = utils.formatterTime(new Date())
        this.form.cover = this.form.content.match(/(http[^">]*)/g)[0]
        let para = new URLSearchParams(this.form)
        let a
        if (this.currentSetStatus === 'add') {
          a = articlesadd(para)
        } else {
          a = articlesedit(para)
        }
        a.then(res => {
          console.log(res)
          let { code, msg } = res
          if (code === 200) {
            this.getarticleslist()
            this.show = 'list'
            this.preview = false
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        })
      }
    }
  },
}
</script>
<style lang="stylus">
#articles {
  .articles__btn {
    text-align right 
    margin-bottom 20px
  }
  .articles__title {
    margin 20px 0
    font-size 20px
  }
  .ql-container {
    height 800px
  }
  .articles {
    &__title {
      font-size 24px
      text-align center
    }
    &__info {
      text-align right
      font-size 16px
      color #888
      span {
        display inline-block
        margin 0 8px
      }
    }
    &__content {
      margin-top 20px
      text-indent 2em
    }
  }
}
</style>

