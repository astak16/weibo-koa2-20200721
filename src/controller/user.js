const {getUserInfo, createUser, deleteUser, updateUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
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

const deleteCurrentUser = async (userName) => {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }

  return new ErrorModel(deleteUserFailInfo)
}

const changeInfo = async (ctx, {nickName, city, picture}) => {
  const {userName} = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }

  const result = await updateUser({
    newPicture: picture,
    newCity: city,
    newNickName: nickName
  }, {
    userName
  })
  if (result) {
    Object.assign(ctx.session.userInfo, {nickName, picture, city})
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

const changePassword = async (userName, password, newPassword) => {
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  })
  if (result)
    return new SuccessModel()
  return new ErrorModel(changePasswordFailInfo)
}

const logout = (ctx)=>{
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurrentUser,
  changeInfo,
  changePassword,
  logout
}
