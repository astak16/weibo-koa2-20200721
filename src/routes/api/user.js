const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo
} = require('../../controller/user')
const {userValidator} = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const {isTest} = require('../../utils/env')
const {loginCheck} = require('../../middlewares/loginCheck')

router.prefix('/api/user')

router.post('/register', genValidator(userValidator), async (ctx, next) => {
  const {userName, password, gender} = ctx.request.body
  ctx.body = await register({
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

router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const {userName} = ctx.session.userInfo
    ctx.body = await deleteCurrentUser(userName)
  }
})

router.patch('/changeInfo', loginCheck, genValidator(userValidator), async (ctx, next) => {
  const {nickName, city, picture} = ctx.session.body
  ctx.body = await changeInfo(ctx, {nickName, city, picture})
})

module.exports = router
