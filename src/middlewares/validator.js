const {ErrorModel} = require('../model/ResModel')
const {jsonSchemaFileInfo} = require('../model/ErrorInfo')
/**
 *
 * @param {function}validatorFunction
 * @returns {function(...[*]=)}
 */
const genValidator = (validatorFunction) => {
  return async (ctx, next) => {
    console.log(ctx.request.body)
    const error = validatorFunction(ctx.request.body)
    console.log(error)
    if (error)
      return ctx.body = new ErrorModel(jsonSchemaFileInfo)
    await next()
  }
}

module.exports = {
  genValidator
}
