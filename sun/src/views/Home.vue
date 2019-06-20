<template>
  <div class="home">
      <div id="regNum"></div>
      {{ userslist }}
  </div>
</template>

<script>
import { users, goods } from '../api'
export default {
  name: 'home',
  data () {
    return {
      options: {
        title: {
          text: 'Number of registered persons'
        },
      },
      userslist: [],
    }
  },
  mounted() {
    let regNum = this.$echarts.init(document.getElementById('regNum'), 'dark')
    this.setEcharts(regNum, this.options)
    this.getusersList()

    // let para = {}
    // goods(para).then((res) => {
    //   console.log(res)
    // })
  },
  methods: {
    /**
      @method 设置图像
      @param {obj, obj} dom对象, 配置参数
     */
    setEcharts (obj, options) {
      obj.setOption(options)
    },
    getusersList () { //  查询用户列表
      let para = {}
      users(para).then((res) => {
        console.log(res)
        this.userslist = res.data
      })
    }
    
  },
}
</script>
<style lang="stylus" scoped>
#regNum {
  width 500px
  height  300px
}
</style>

