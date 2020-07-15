const router = require('koa-router')()
const {isExist, register} = require('../../controller/user')
const {userValidator} = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const {login} = require('../../controller/user')

router.prefix('/api/user')

router.post('/register', genValidator(userValidator), async (ctx, next) => {
  const {userName, password, gender} = ctx.request.body
  await register({
    userName,
    password,
    gender
  })
})

router.post('/isExist', async (ctx, next) => {
  const {userName} = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
  const {userName, password} = ctx.request.body
  ctx.body = await login({ctx, userName, password})
})

module.exports = router
