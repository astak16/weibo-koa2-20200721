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

module.exports = {
  getUserInfo
}
