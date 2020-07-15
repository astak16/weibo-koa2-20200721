const {DEFAULT_PICTURE} = require('../conf/constants')
/**
 *
 * @param {Object} obj
 * @returns {{picture}|*}
 *
 */
const _formatUserPicture = (obj) => {
  if (!obj.picture)
    obj.picture = DEFAULT_PICTURE
  return obj
}

/**
 *
 * @param {Object,Object[]}list
 * @returns {Object|[]|*}
 */
const formatUser = (list) => {
  if (!list) return
  if (list instanceof Array)
    return list.map(_formatUserPicture)

  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}
