const mongoose = require('mongoose')
const Schema = mongoose.Schema

const procutSchema = new Schema({
  "name" : String, //  "名称", 
  "price" : Number, //  "价钱"
  "img" : String, //  "封面图", 
  "desc" : String, //  "描述", 
  "collections" : Number, //  "收藏", 
  "read" : String, //  "浏览", 
  "createDate" : String, //  "创建时间", 
  "label": String, //  标签
})

module.exports = mongoose.model('product', procutSchema)