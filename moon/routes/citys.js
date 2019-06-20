
const router = require('koa-router')()

const mongoose = require('mongoose')
const citys = require('../models/citys')

router.prefix('/citys')

mongoose.connect('mongodb://127.0.0.1:27017/koa', { useNewUrlParser:true })


router.get('/', async (ctx, next) => {
  let res = await citys.find()
  if (res.length) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
      data: res,
      total:res.length
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: res.message,
      data: res
    }
  }
})

module.exports = router
