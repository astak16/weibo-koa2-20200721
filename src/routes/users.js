const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verigy = util.promisify(jwt.verify)
router.prefix('/users')


module.exports = router
