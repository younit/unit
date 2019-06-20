const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citysSchema = new Schema({
  'name': String, //  名字
  'hot': Number,  //  热度
  'rank': Number, //  排名
  'score': Number, //  评分
  'adultTicket': Number, //  成人票
  'childTicket': Number, //  儿童票
  'openingTime': Number, //  开门时间
  'closingTime': Number, //  关门时间
  'hasTickets': Boolean, //  是否有票
  "address": String, //  地址
  "phone": Number, //  电话
  "city": String, //  城市
})
module.exports = mongoose.model('citys', citysSchema)