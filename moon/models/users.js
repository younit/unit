const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  'phone': String, //  手机号码
  'pwd': String, //  密码
  'name': String, //  用户名
  'status': Number, //  状态
  'role': String, //  角色
  'roleLv': Number, //  角色等级
  'headImg': String, //  头像
  
})
module.exports = mongoose.model('users', productSchema)