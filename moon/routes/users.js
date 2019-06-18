const router = require('koa-router')()
const mongoose = require('mongoose')
const users = require('../models/users')
router.prefix('/users')
mongoose.connect('mongodb://localhost:27017/msea', { useNewUrlParser:true })

router.get('/', async (ctx, next) => { //  用户列表
  let res = await users.find()
  ctx.response.body = res
  // if (res.length > 0) {
  //   ctx.response.body = {
  //     code: 200,
  //     msg: '操作成功',
  //     total: res.length,
  //     data: res
  //   }
  // } else {
  //   ctx.response.body = {
  //     code: 1001,
  //     msg: '查询失败',
  //   }
  // }
})

router.post('/login', async (ctx, next) => { //  用户登录
  let que = ctx.request.body
  let para = {
    'name': que.name,
    'pwd': que.pwd
  }
  let res = await users.find(para)
  if (res.length > 0) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: '登录失败, 请检查帐号密码是否正确。',
    }
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
