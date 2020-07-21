const {getBlogListByUser} = require('../services/blog')
const {PAGE_SIZE} = require('../conf/constants')
const {SuccessModel} = require('../model/ResModel')

const getProfileBlogList = async (userName, pageIndex = 0) => {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}
