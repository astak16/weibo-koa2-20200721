const {User} = require('../db/model/index')
const {formatUser} = require('./_format')
/**
 *
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<void>}
 */
const getUserInfo = async (userName, password) => {
  const whereOpt = {
    userName
  }
  if (password)
    Object.assign(whereOpt, {password})

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null)
    return result

  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 *
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName
 */
const createUser = async ({userName, password, gender = 3, nickName}) => {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}

const deleteUser = async (userName) => {
  const result = await User.destroy({
    where: {
      userName
    }
  })

  // result 删除的行数
  return result > 0
}

const updateUser = async ({newPassword, newNickName, newPicture, newCity}, {userName, password}) => {
  const updateData = {}
  if (newPassword)
    updateData.password = newPassword
  if (newNickName)
    updateData.nickName = newNickName
  if (newPicture)
    updateData.picture = newPicture
  if (newPassword)
    updateData.city = newCity
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
