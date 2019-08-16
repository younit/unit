<template>
  <div>
     <template>

      <div class="txtright marginbtm30">
        <el-button type="info" @click="handleSet('add', {})">添加产品</el-button>
      </div>
      <el-table
        :data="list.data"
        style="width: 100%">

        <el-table-column label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="价钱">
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>

        <el-table-column label="封面">
          <template slot-scope="scope"><img v-if="scope.row.img" :src="scope.row.img" class="headimg" @click="handleSet('preview', scope.row.img)"></template>
        </el-table-column>

        <el-table-column label="描述">
          <template slot-scope="scope">{{ scope.row.desc }}</template>
        </el-table-column>

        <el-table-column label="收藏">
          <template slot-scope="scope">{{ scope.row.collections }}</template>
        </el-table-column>

        <el-table-column label="浏览">
          <template slot-scope="scope">{{ scope.row.read }}</template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ getTime(scope.row.createDate) }}</template>
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

    <el-dialog
      :title="dialogCfg.title"
      :visible.sync="dialogCfg.dialogVisible"
      :width="dialogCfg.width"
      :center="dialogCfg.center"
      :fullscreen="dialogCfg.fullscreen"
      >
      <template  v-if="currentSetSts === 'preview'">
        <img :src="previewImg" alt="" class="previewImg">
      </template>
      <template v-if="currentSetSts !== 'preview'">
        <el-form :model="form" ref="form" :rules="rules" :label-width="rules.width" class="formStyle">

          <el-form-item label="名称" prop="name" :label-width="rules.width">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>

          <el-form-item label="价钱" prop="price" :label-width="rules.width">
            <el-input v-model.number="form.price"></el-input>
          </el-form-item>

          <el-form-item label="商品封面" prop="img" :label-width="rules.width">
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
          </el-form-item>

          <el-form-item label="商品介绍" :label-width="rules.width">
            <el-input v-model="form.desc" clearable></el-input>
          </el-form-item>

        </el-form>
      </template>
      

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCfg.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSuccess()" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { product, productadd, qiniuupload, productdelete } from '../api'
import utils from '../utils/index'
export default {
  name: 'product',
  data () {
    return {
      form: {}, //  表单
      imageUrl: '', //  预览图
      currentSetSts: '', //  当前操作状态
      previewImg: '',
      para: {
        pageIndex: 1,
        pageSize: 10,
      },
      list: { //  用户信息
        data: [], //  数据
        total: 0 //  总数
      },
      dialogCfg: { //  弹出框配置
        title: '', //  标题
        dialogVisible: false, //  显示隐藏弹出框
        width: '30%', //  宽度
        center: true, //  是否居中
        fullscreen: false, //  是否全屏
      },
      rules: { //  规则
        width: '100px',
        name: [{ required: true, message: '请输入景点名称', trigger: 'blur', type: 'string' },],
        price: [{ required: true, message: '请输入成人票价格', trigger: 'blur' }, { type: 'number', message: '必须为数字值'}],
        img: [{ required: true, message: '请选择时间', trigger: 'change' }],
      },
      fullscreenLoading: false,
      isuploadImg: false
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    handleSearch (obj, val) { //  查询数据列表 obj: 对象, val: 值
      switch (obj) {
        case 'pagination': //  分页
          this.para.pageIndex = val
          this.getlist()
          break
      }
    },
    getlist () {
      product(this.para).then(res => {
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
    handleSet (obj, row) {
      console.log(obj, row)
      this.currentSetSts = obj //  设置当前操作状态
      switch (obj) {
        case 'add': //  添加
          this.dialogCfg.title = '添加'
          this.dialogCfg.width = '30%'
          this.form = {}
          this.imageUrl = ''
          this.dialogCfg.dialogVisible = true
          break
        case 'edit': //  编辑
          this.dialogCfg.title = '编辑'
          this.dialogCfg.width = '30%'
          this.form = row
          this.form._id = row._id
          this.imageUrl = row.img
          this.isuploadImg = false
          this.dialogCfg.dialogVisible = true
          break
        case 'preview': //  预览图片
          if (row) {
            this.dialogCfg.title = '预览'
            this.previewImg = row
            this.dialogCfg.dialogVisible = true
          }
          break
        case 'delete':
          this.$confirm('此操作将删除该数据是否继续?', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'danger'
          }).then(() => {
            this.form._id = row._id
            let para = new URLSearchParams(this.form)
            this.fullscreenLoading = true
            productdelete(para).then(res => {
              let { code, msg } = res
              if (code === 200) {
                this.fullscreenLoading = false
                this.$message.success(msg)
                this.getlist()
              } else {
                this.fullscreenLoading = false
                this.$message.error(msg)
              }
            })
          }).catch(() => {
            this.$message.info('已取消')
          })
          break
      }
    },
    handleSuccess () {
      const _this = this
      console.log(this.currentSetSts)
      switch (this.currentSetSts) {
      case 'add':
      case 'edit': //  添加
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            if (this.isuploadImg === false) { //  判断是否重新上传了图片
              this.postadd()
            } else {
              let para = new URLSearchParams(_this.form)
              qiniuupload(para).then(res => {
                console.log(res)
                let { code, data, url } = res
                if (code === 200) {
                  this.form.img = ''
                  let { key, hash } = data
                  console.log(key, hash)
                  _this.form.img = url + key
                  this.postadd()
                }
              })
            }
          } else {
            this.$message.error('请填写完整')
            return false
          }
        })
          break
        case 'preview':
          this.dialogCfg.dialogVisible = false
          break
       }
    },
    handleChange (file) {
      const _this = this
      this.imageUrl = URL.createObjectURL(file.raw) // 图片预览
      let reader = new FileReader() //  生成文件读取
      reader.readAsDataURL(file.raw) //  转化文件数据流链接
      reader.onload = function () {
        _this.form.img = reader.result //  拿到base64结果
        _this.isuploadImg = true
      }
    },
    postadd () {
      if (this.form._id) { //  编辑
      } else {
        this.form.createDate = new Date().getTime()
      }
      let para = new URLSearchParams(this.form)
      productadd(para).then(res => {
        console.log(res)
        let { code, msg } = res
        if (code === 200) {
          this.fullscreenLoading = false
          this.$message.success(msg)
          this.getlist()
          this.dialogCfg.dialogVisible = false
          // this.$confirm('添加成功,是否继续添加?', '提示', {
          //   confirmButtonText: '继续',
          //   cancelButtonText: '取消',
          //   type: 'primary'
          // }).then(() => {
          //   this.form.name = ''
          // }).catch(() => {
          //   this.$message.success(msg)
          //   this.getlist()
          //   this.dialogCfg.dialogVisible = false
          // })
        } else {
          this.fullscreenLoading = false
          this.$message.error(msg)
        }
      })
    },
    getTime(time) {
      if (time) {
        return utils.formatterTime(parseInt(time))
      }
      return ''
    },
  },

}
</script>
<style lang="stylus" scoped>
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
  width: 100px;
  height: 100px;
  border: 1px solid #ccc
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  line-height: 100px;
  display: block;
}
.headimg {
  width 20px
  height 20px
}
.previewImg {
  display: inherit 
  margin  0 auto
  width 100%
}
</style>
