const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const BLOG_LIST_TPL = fs.readFileSync(path.json(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))


const getBlogListStr = (blogList = [], canReply = false) => {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
}
