module.exports = {
  connectDB (mongoose) {
    return mongoose.connect('mongodb://sea:sea@47.103.147.50:27017/sea', { useNewUrlParser:true })
  },
  find (ctx, res, total) {
    if (res) {
      return ctx.response.body = {
        code: 200,
        msg: '操作成功',
        data: res,
        total:total
      }
    } else {
      return  ctx.response.body = {
        code: 1001,
        msg: res.message,
        data: res
      }
    }
  },
  tips (ctx, res) {
    if (res) {
     return ctx.response.body = {
        code: 200,
        msg: '操作成功',
      }
    } else {
      return  ctx.response.body = {
        code: 1001,
        msg: '操作失败',
      }
    }
  }
}