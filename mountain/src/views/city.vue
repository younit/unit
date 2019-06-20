<template>
  <div>
    <template>
      <div class="txtright marginbtm30">
         <el-button type="info" @click="handleSet('add', {})">添加城市</el-button>
      </div>
    </template>
    <template>
      <el-table
        :data="list.data"
        style="width: 100%">

         <el-table-column label="城市">
          <template slot-scope="scope">{{ scope.row.city }}</template>
        </el-table-column>

        <el-table-column label="名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="热度">
          <template slot-scope="scope">{{ scope.row.hot }}</template>
        </el-table-column>

        <el-table-column label="排名">
          <template slot-scope="scope">{{ scope.row.rank }}</template>
        </el-table-column>

        <el-table-column label="评分">
          <template slot-scope="scope">{{ scope.row.score }}</template>
        </el-table-column>

        <el-table-column label="成人票(￥)" min-width="90">
          <template slot-scope="scope">{{ scope.row.adultTicket }}</template>
        </el-table-column>

        <el-table-column label="儿童票(￥)" min-width="90">
          <template slot-scope="scope">{{ scope.row.childTicket }}</template>
        </el-table-column>

        <el-table-column label="开门时间">
          <template slot-scope="scope">{{ 'AM: ' + scope.row.openingTime }}</template>
        </el-table-column>

        <el-table-column label="关门时间">
          <template slot-scope="scope">{{ 'PM: ' +scope.row.closingTime }}</template>
        </el-table-column>

        <el-table-column label="是否有票">
          <template slot-scope="scope">{{ scope.row.hasTickets === true? '有': '无' }}</template>
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

      <el-form :model="form" :rules="rules" :label-width="rules.width">
        <el-form-item label="城市" prop="city">
          <el-select v-model="form.city" placeholder="请选择" >
            <el-option
              v-for="item in getcitys"
              :key="item.key"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="景点名称" prop="name" :label-width="rules.width">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="成人票" prop="adultTicket" :label-width="rules.width">
          <el-input v-model.number="form.adultTicket"></el-input>
        </el-form-item>

        <el-form-item label="儿童票" prop="childTicket" :label-width="rules.width">
          <el-input v-model.number="form.childTicket"></el-input>
        </el-form-item>

        <el-form-item label="开门时间" prop="openingTime" :label-width="rules.width">
          <el-input v-model.number="form.openingTime"></el-input>
        </el-form-item>

        <el-form-item label="关门时间" prop="closingTime" :label-width="rules.width">
          <el-input v-model.number="form.closingTime"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCfg.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSuccess()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { cityslist } from '../api'
import { mapGetters } from 'vuex'
export default {
  name: 'system',
  data () {
    return {
      list: { //  用户信息
        data: [], //  数据
        total: 0 //  总数
      },
      form: {}, //  表单
      currentSetSts: '', //  当前操作状态
      dialogCfg: { //  弹出框配置
        title: '', //  标题
        dialogVisible: false, //  显示隐藏弹出框
        width: '30%', //  宽度
        center: true, //  是否居中
        fullscreen: false, //  是否全屏
      },
      rules: {
        width: '100px',
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        name: [{ required: true, message: '请输入景点名称', trigger: 'blur' },],
        adultTicket: [{ required: true, message: '请输入成人票价格', trigger: 'blur' }, { type: 'number', message: '必须为数字值'}],
        childTicket: [{ required: true, message: '请输入儿童票价格', trigger: 'blur' }, { type: 'number', message: '必须为数字值'}],
        openingTime: [{ required: true, message: '请输入开始时间', trigger: 'blur' },],
        closingTime: [{ required: true, message: '请输入结束', trigger: 'blur' },],
      }, //  规则
      para: { //  查询条件
        pageIndex: 1,
        pageSize: 10,
      }
    }
  },
  computed: {
    ...mapGetters(['getcitys'])
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist () { //  查询用户列表
      cityslist(this.para).then(res => {
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
      this.from = row
      this.currentSetSts = obj //  设置当前操作状态
      switch (obj) {
        case 'add': //  添加
          this.dialogCfg.title = '添加'
          this.dialogCfg.dialogVisible = true
          break
        case 'edit': //  编辑
          break
        case 'delete': //  删除
          break
      }
    },
    handleSuccess () {
      switch (this.currentSetSts) {
        case 'add': //  添加
          this.dialogCfg.dialogVisible = false
          break
        case 'edit': //  编辑
          break
        case 'delete': //  删除
          break
      }
    }
  },
}
</script>
<style lang="stylus" scoped>

</style>

