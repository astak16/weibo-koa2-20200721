const {Blog, User} = require('../db/model/index')
const {formatUser} = require('./_format')

const createBlog = async ({userId, content, image}) => {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

const getBlogListByUser = async (userName, pageIndex = 0, pageSize = 10) => {
  const userWhereOpt = {}
  if (userName) {
    userWhereOpt.userName = userName
  }
  const result = await Blog.findAndCountAll({
    limit: pageIndex,
    offset: pageSize * pageIndex,
    order: ['id', 'desc'],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpt
      }
    ]
  })

  // result.count 总数
  // result.rows 查询结果，数组

  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
