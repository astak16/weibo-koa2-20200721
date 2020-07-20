const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginCheck')
const koaFrom = require('formidable-upload-koa')
const {saveFile} = require('../../controller/util')
router.prefix('/api/utils')

router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const {size, path, name, type} = file
  ctx.body = saveFile({
    size,
    name,
    type,
    filePath:path
  })
})

module.exports = router
