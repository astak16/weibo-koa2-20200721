const Koa = require('koa')
const path = require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {SESSION_SECRET_KEY} = require('./conf/secretKeys')

const blogViewRouter = require('./routes/view/blog')
const profileApiRouter = require('./routes/api/blog-profile')
const squareApiRouter = require('./routes/api/blog-square')
const blogHomeApiRouter = require('./routes/api/blog-home')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/util')
const errorViewRouter = require('./routes/view/error')
const {isProd} = require('./utils/env')
// const {jwtKoa} = require('koa-jwt')
// const {SECRET} = require('./conf/constants')
const {REDIS_CONF} = require('./conf/db')

// error handler
const onerrorConf = {}
if (isProd)
  onerrorConf.redirect = '/error'
onerror(app, onerrorConf)


app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname, '..', '/uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认 'koa.sid'
  prefix: 'weibo:sess:', // redis key 前缀，默认是 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000   // ms
  },
  // ttl:24 * 60 * 60 * 1000   // ms, 不写，默认和 maxAge 一样
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(blogViewRouter.routes(), userApiRouter.allowedMethods())
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods)
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
