
const router = require('koa-router')()
const mongoose = require('mongoose')
const set = require('./set')
const articles = require('../models/articles')
router.prefix('/articles')

set.connectDB(mongoose)

function articlesmodel (ctx) {
  let para = {
    "title" : ctx.request.body.title, //  "标题", 
    "cover": ctx.request.body.cover,
    "author" : ctx.request.body.author, //  "作者", 
    "uid" : ctx.request.body.uid, //  "作者id", 
    "date" : ctx.request.body.date, //  "日期", 
    "content" : ctx.request.body.content, //  "内容", 
    "likes" : ctx.request.body.likes || '', //  "喜欢", 
    "score" : ctx.request.body.score || '', //  "评分"
  }
  return para
}

router.get('/', async (ctx, next) => { //  列表
  // let para = ctx.query
  let pageIndex = parseInt(ctx.query.pageIndex)
  let pageSize = parseInt(ctx.query.pageSize)
  let total = await articles.find().count()
  let res = await articles.find().skip(pageSize * (pageIndex - 1)).limit(pageSize).sort({'date': 1})
  set.find(ctx, res, total)
})

router.get('/detail', async (ctx, next) => { //  详情
  let para = {
    _id: ctx.query._id
  }
  let res = await articles.find(para)
  set.tips(ctx, res)
})

router.post('/add', async (ctx, next) => { //  添加
  let para = articlesmodel(ctx)
  let res  = await articles.create(para)
  set.tips(ctx, res)
})

router.post('/edit', async (ctx, next) => { //  修改
  let where = {'_id': ctx.request.body._id}
  let para = articlesmodel(ctx)
  let res  = await articles.update(where, para)
  set.tips(ctx, res)
})


router.post('/delete', async (ctx, next) => { //  删除
  let where = {'_id': ctx.request.body._id}
  
  let res  = await articles.remove(where)
  set.tips(ctx, res)
})



module.exports = router
