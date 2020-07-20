const xss = require('xss')
const {createBlog} = require('../services/blog')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {createBlogFailInfo} = require('../model/ErrorInfo')

const create = async ({userId, content, image}) => {
  try {
    const result = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(result)
  } catch (e) {
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
