<template>
  <div>
    <van-tabs v-model="active" sticky animated @click="handleChangeActive">
      <van-tab v-for="item in tasks" :title="item.name" :key="item.key">
        <div v-for="n in list" :key="n.key">
          {{ n.name }}
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: '未接任务',
      tasks: [
        {
          name: '全部任务'
        },
        {
          name: '未接任务'
        },
        {
          name: '已接任务'
        },
        {
          name: '完成任务'
        },
      ],
      list: [
        {
          name: '1',
          status: 0
        },
        {
          name: '2',
          status: 0
        },
        {
          name: '3',
          status: 1
        },
      ]
    }
  },
  methods: {
    handleChangeActive (name, title) {
      console.log(name, title)
    }
  },
}
</script>

<style>

</style>
