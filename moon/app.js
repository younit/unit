const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


let rlist = [index, users, goods, citys, articles, qiniu, product, task] = [
  require('./routes/index'),
  require('./routes/users'),
  require('./routes/goods'),
  require('./routes/citys'),
  require('./routes/articles'),
  require('./routes/qiniu'),
  require('./routes/product'),
  require('./routes/task'),
]


const cors = require('koa2-cors')
// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  formLimit: '50mb', //  默认56kb
  jsonLimit: '50mb', //  默认1mb
  textLimit: '50mb', //  默认1mb
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
for (let i = 0; i < rlist.length; i++) {
  app.use(rlist[i].routes(), rlist[i].allowedMethods())
}
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
