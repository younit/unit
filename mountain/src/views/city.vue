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
     </template>

    <el-dialog
      :title="dialogCfg.title"
      :visible.sync="dialogCfg.dialogVisible"
      :width="dialogCfg.width"
      :center="dialogCfg.center"
      :fullscreen="dialogCfg.fullscreen"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCfg.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSuccess()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { cityslist } from '../api'
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
        width: '50%', //  宽度
        center: true, //  是否居中
        fullscreen: false, //  是否全屏
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist () { //  查询用户列表
      let para
      cityslist(para).then(res => {
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
          this.dialogCfg.dialogVisible = true
          break
        case 'edit': //  编辑
          break
        case 'delete': //  删除
          break
      }
    },
    handleSuccess (sts) {
      switch (this.currentSetSts) {
        case 'add': //  添加
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

