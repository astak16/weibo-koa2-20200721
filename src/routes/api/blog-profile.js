const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginCheck')
const {getProfileBlogList} = require('../../controller/blog-profile')
const {getBlogListStr} = require('../../utils/blog')
router.prefix('/api/profile')

router.post('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let {userName, pageIndex} = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router
