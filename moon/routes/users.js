const router = require('koa-router')()
const mongoose = require('mongoose')
const users = require('../models/users')
router.prefix('/users')
// mongoose.connect('mongodb://127.0.0.1:27017/koa', { useNewUrlParser:true })
mongoose.connect('mongodb://sea:sea@47.103.147.50:27017/sea', { useNewUrlParser:true })

router.get('/', async (ctx, next) => { //  查询用户列表
  let res = await users.find()
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
      msg: '账号密码错误',
      data: res
    }
  }
})

router.post('/login', async (ctx, next) =>{ //  登录
  console.log(ctx.request.body)
  let para = {
    'phone': ctx.request.body.phone,
    'pwd': ctx.request.body.pwd
  }
  let res = await users.find(para)
  console.log(res)
  if (res.length) {
    if (res[0].roleLv !== 0) {
      ctx.response.body = {
        code: 1002,
        msg: '无权限登录',
        // data: res
      }
    } else {
      ctx.response.body = {
        code: 200,
        msg: '操作成功',
        data: res
      }
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: '账号密码错误',
      data: res
    }
  }
})

router.post('/add', async (ctx, next) =>{ //  注册
  console.log(ctx.request.body)
  let para = {
    'phone': ctx.request.body.phone,
    'pwd': ctx.request.body.pwd,
    'name': ctx.request.body.name,
    'role': ctx.request.body.role,
    'roleLv': ctx.request.body.role === 'ordinary'? 1: 2,
  }
  let res = await users.create(para)
  if (res) {
    ctx.response.body = {
      code: 200,
      msg: '操作成功',
    }
  } else {
    ctx.response.body = {
      code: 1001,
      msg: '注册失败',
    }
  }
})

module.exports = router
