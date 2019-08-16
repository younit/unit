
const router = require('koa-router')()
const mongoose = require('mongoose')
const set = require('./set')
const _db = require('../models/task')
router.prefix('/task')

set.connectDB(mongoose)

router.get('/', async (ctx, next) => { //  列表
  // let para = ctx.query
  let pageIndex = parseInt(ctx.query.pageIndex)
  let pageSize = parseInt(ctx.query.pageSize)
  let total = await _db.find().count()
  let res = await _db.find().skip(pageSize * (pageIndex - 1)).limit(pageSize)
  set.find(ctx, res, total)
})

router.get('/detail', async (ctx, next) => { //  详情
  let para = {
    _id: ctx.query._id
  }
  let res = await _db.find(para)
  set.tips(ctx, res)
})

router.post('/add', async (ctx, next) => { //  添加
  let res
  if (ctx.request.body.createDate) {
    ctx.request.body.createDate = new Date(parseInt(ctx.request.body.createDate)).getTime()
  }
  let para = ctx.request.body
  if (para._id) { //  修改
    let where = {'_id': ctx.request.body._id}
    res  = await _db.update(where, para)
  } else { //  添加
    res  = await _db.create(para)
  }
  set.tips(ctx, res)
})

router.post('/delete', async (ctx, next) => { //  删除
  let where = {'_id': ctx.request.body._id}
  
  let res  = await _db.remove(where)
  set.tips(ctx, res)
})



module.exports = router
