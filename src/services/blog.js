const {Blog} = require('../db/model/index')

const createBlog = async ({userId, content, image}) => {
  // console.log(userId,content,image,'打印')
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}
