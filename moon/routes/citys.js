
const router = require('koa-router')()

const mongoose = require('mongoose')
const citys = require('../models/citys')

router.prefix('/citys')

mongoose.connect('mongodb://127.0.0.1:27017/koa', { useNewUrlParser:true })


router.get('/', async (ctx, next) => {
  let para = {}
  console.log(ctx.query)
  let pageIndex = parseInt(ctx.query.pageIndex)
  let pageSize = parseInt(ctx.query.pageSize)
  let total = await citys.find().count()
  let res = await citys.find().skip(pageSize * (pageIndex - 1)).limit(pageSize)
  if (res) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
      data: res,
      total:total
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: res.message,
      data: res
    }
  }
})

router.post('/add', async (ctx, next) => { //  添加景点
  let para = {
    "city": ctx.request.body.city, //  城市
    'name': ctx.request.body.name, //  名字
    'hot': null,  //  热度
    'rank': null, //  排名
    'score': null, //  评分
    'adultTicket': ctx.request.body.adultTicket, //  成人票
    'childTicket': ctx.request.body.childTicket, //  儿童票
    'openingTime': ctx.request.body.openingTime, //  开门时间
    'closingTime': ctx.request.body.closingTime, //  关门时间
    'hasTickets': true, //  是否有票
    "address": null, //  地址
    "phone": null, //  电话
  }
  let res  = await citys.create(para)
  console.log(res)
  if (res) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: '操作失败',
    }
  }
})

router.post('/edit', async (ctx, next) => { //  修改景点
  let where = {'_id': ctx.request.body.id}
  let para = {
    "city": ctx.request.body.city, //  城市
    'name': ctx.request.body.name, //  名字
    'hot': null,  //  热度
    'rank': null, //  排名
    'score': null, //  评分
    'adultTicket': ctx.request.body.adultTicket, //  成人票
    'childTicket': ctx.request.body.childTicket, //  儿童票
    'openingTime': ctx.request.body.openingTime, //  开门时间
    'closingTime': ctx.request.body.closingTime, //  关门时间
    'hasTickets': true, //  是否有票
    "address": null, //  地址
    "phone": null, //  电话
  }
  let res  = await citys.update(where, para)
  console.log(res)
  if (res) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: '操作失败',
    }
  }
})

router.post('/delete', async (ctx, next) => { //  修改景点
  let where = {'_id': ctx.request.body.id}
  
  let res  = await citys.remove(where)
  console.log(res)
  if (res) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: '操作失败',
    }
  }
})

module.exports = router
