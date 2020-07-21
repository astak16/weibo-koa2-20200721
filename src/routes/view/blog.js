const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginCheck')
const {getProfileBlogList} = require('../../controller/blog-profile')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

router.get('/profile/', loginRedirect, async (ctx, next) => {
  const {userName} = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const {userName: currentUserName} = ctx.params

  const result = await getProfileBlogList(currentUserName, 0)
  const {isEmpty, blogList, pageSize, pageIndex, count} = result.data
  await ctx.render('profile', {
    blogData: {
      isEmpty, blogList, pageSize, pageIndex, count
    }
  })
})

module.exports = router
