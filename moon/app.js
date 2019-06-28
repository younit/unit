const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const goods = require('./routes/goods')
const citys = require('./routes/citys')
const cors = require('koa2-cors')

// error handler
onerror(app)

// middlewares
app.use(cors())
// app.use(cors({
//   origin: function (ctx) {
//     console.log(ctx)
// 		if (ctx.url === '/goods') {
// 			return "*"; // 允许来自所有域名请求
// 		}
// 		return 'http://localhost:8080';
// 	},
// 	methods:['GET','POST'],
// 	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))
/**
*    另一种写法
*    var cors = require('koa2-cors');
*    app.use(cors())
*/
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
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
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080")
  // ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
  // ctx.set("Access-Control-Allow-Credentials", "true")
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(citys.routes(), citys.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
