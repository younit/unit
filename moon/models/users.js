const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  'name': String,
  'pwd': String,
  'status': Number
})
module.exports = mongoose.model('users', productSchema)