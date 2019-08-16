const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _Schema = new Schema({
  "name" : String, //  "名称", 
  "status" : Number, //  "状态" 1, 未接任务， 2，已接任务，3.完成任务
  "score" : Number, //  "积分",
  "img" : String, //  "封面图", 
  "desc" : String, //  "描述", 
  "surplus" : String, //  剩余, 
  "createDate" : String, //  "创建时间",
  "updateTime": String, //  ”更新时间“
})

module.exports = mongoose.model('task', _Schema)