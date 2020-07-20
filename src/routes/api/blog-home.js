const blogValidate = require('../../validator/blog')
const {genValidator} = require('../../middlewares/validator')
const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginCheck')
const {create} = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const {content, image} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  console.log('12aappii',userId)
  ctx.body = await create({userId, content, image})
})

module.exports = router
