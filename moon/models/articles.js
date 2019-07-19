const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articlesSchema = new Schema({
  "title" : String, //  "标题", 
  "cover" : String, //  "封面"
  "author" : String, //  "作者", 
  "uid" : String, //  "作者id", 
  "date" : Number, //  "日期", 
  "content" : String, //  "内容", 
  "likes" : String, //  "喜欢", 
  "score" : String, //  "评分"
})

module.exports = mongoose.model('articles', articlesSchema)