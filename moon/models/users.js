const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    "nickname" : String, 
    "name" : String, 
    "pwd" : String, 
    "status" : Number, 
    "cityEn" : String, 
    "cityCn" : String, 
    "job" : String, 
    "phone" : String
})
module.exports = mongoose.model('users', usersSchema)