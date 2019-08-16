
const router = require('koa-router')()
const set = require('./set')
const qn = require('../models/qn')
const fs = require('fs')

router.prefix('/qiniu')

router.get('/token', async (ctx, next) => {
  let res = qn.uptoken(ctx.query.bucket)
  console.log(res)
  set.tips(ctx, res)
  next()
})

router.post('/upload', async (ctx, next) => {
  let img = ctx.request.body.img
  // let suffixName = img.match(/[^.]+$/)
  let suffixName = img.match(/[^data:image\/]\w+[^;base]/)
  let base = img.replace(/^data:image\/\w+;base64,/, "")
  let dbuff = new Buffer(base, 'base64')
  let temporaryImg = new Date().getTime() + '.' + suffixName
  var p = function () {
    return new Promise((resolve,reject) => {
      fs.writeFile(temporaryImg, dbuff, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  await p()
  await qn.upImg(temporaryImg).then(res => {
    ctx.response.body = {
      msg: '操作成功',
      data: res,
      url: 'http://mziu.club/',
      code: 200
    }
  })
})

module.exports = router
