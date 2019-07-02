<template>
  <div id="articles">
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

    
    <template v-if="show !== 'list'">
      <div class="articles__btn">
        <el-button type="info" @click="handleSet('back', null)" >返回</el-button>
        <el-button type="success" @click="handleSubmit" >发布</el-button>
      </div>
      <div class="articles__title">
        <el-input ref="myinput" placeholder="请输入标题" v-model="form.title " clearable></el-input>
      </div>
      <quill-editor 
        v-model="form.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
    </template>
  </div>
</template>

<script>
import utils from '../utils/index'
import { articlesadd, articleslist, articlesedit, articlesdelete } from '../api'
export default {
  name: '',
  data () {
    return {
      editorOption: {
        // some quill options
      },
      show: '', //  默认显示列表
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
        content: ''
      }
    }
  },
  created() {
    
  },
  mounted() {
    this.show = 'list'
    this.getarticleslist()
  },
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
      
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
      switch (obj) {
        case 'add':
          this.form = {}
          this.show = 'add'
          break
        case 'back':
          this.show = 'list'
          break
        case 'edit':
          this.form = row
          this.show = 'edit'
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
        console.log(this.form)
        let para = new URLSearchParams(this.form)
        let a
        if (this.show === 'add') {
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
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        })
      }
    }
  },
  computed: {
    editor() {
      console.log(1)
      return this.$refs.myQuillEditor.quill
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
}
</style>

