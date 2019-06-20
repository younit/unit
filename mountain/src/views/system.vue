<template>
  <div>
    <el-col :span="24">
      <div id="online"></div>
    </el-col>
  </div>
</template>
<script>
import { userslist } from '../api'
export default {
  name: 'system',
  data () {
    return {
      xAxisdata: [], //  时间轴
      reglist: [], //  注册人数
      onlinelist: [], //  在线人数
      options: { //  参数配置
        title: {
          text: '当前注册人数',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['注册人数', '在线人数']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [2018, 2019]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '注册人数',
            data: [1820, 932],
            type: 'line', 
            // areaStyle: {}
          },
          {
            name: '在线人数',
            data: [1820, 3932],
            type: 'line', 
          },
        ]
      },
      list: { //  用户信息
        data: [], //  数据
        total: 0 //  总数
      }
    }
  },
  mounted () {
    this.showPresons()
    this.getuserslist()
  },
  methods: {
    //  注册人数与在线人数
    showPresons () {
      let os = this.$echarts.init(document.getElementById('online'), 'dark')
      os.setOption(this.options)
    },
    getuserslist () { //  查询用户列表
      let para
      userslist(para).then(data => {
        console.log(data)
        let { code, msg, res, total } = data.data
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.list.data = res
          this.list.total = total
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #online {
    width 500px
    height 400px
  }
</style>
