
const router = require('koa-router')()
const set = require('./set')
const qn = require('../models/qn')

router.prefix('/qiniu')

router.get('/token', async (ctx, next) => {
  let res = qn.uptoken(ctx.query.bucket)
  console.log(res)
  set.tips(ctx, res)
  next()
})

module.exports = router
