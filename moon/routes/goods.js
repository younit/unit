
const router = require('koa-router')()

const mongoose = require('mongoose')
const goods = require('../models/goods')

router.prefix('/goods')

// mongoose.connect('mongodb://127.0.0.1:27017/koa', { useNewUrlParser:true })
mongoose.connect('mongodb://sea:sea@47.103.147.50:27017/sea', { useNewUrlParser:true })


router.get('/', async (ctx, next) => {
  let res = await goods.find()
  ctx.response.body = res
  console.log(res)
})

module.exports = router
