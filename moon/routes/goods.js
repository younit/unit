
const router = require('koa-router')()

const mongoose = require('mongoose')
const goods = require('../models/goods')

router.prefix('/goods')

mongoose.connect('mongodb://127.0.0.1:27017/msea', { useNewUrlParser:true })


router.get('/', async (ctx, next) => {
  let res = await goods.find()
  ctx.response.body = res
  console.log(res)
})

module.exports = router
