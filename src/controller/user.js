const {getUserInfo, createUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo, registerFailInfo, loginFailInfo} = require('../model/ErrorInfo')
const {doCrypto} = require('../utils/cryp')

/**
 *
 * @param {string} userName
 */
const isExist = async (userName) => {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}


/**
 *
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 1 男，2 女， 3 保密
 * @param {string} nickName
 */
const register = async ({userName, password, gender, nickName}) => {
  const userInfo = await getUserInfo(userName)
  if (userInfo)
    return new ErrorModel(registerUserNameNotExistInfo)

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (e) {
    console.error(e.message, e.stack())
    return new ErrorModel(registerFailInfo)
  }
}

const login = async ({ctx, userName, password}) => {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo)
    return new ErrorModel(loginFailInfo)

  if (!ctx.session.userInfo)
    ctx.session.userInfo = userInfo
  return new SuccessModel()
}


module.exports = {
  isExist,
  register,
  login
}
