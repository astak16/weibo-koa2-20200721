const {CRYPTO_SECRET_KEY} = require('../conf/secretKeys')
const crypto = require('crypto')

/**
 *
 * @param {string} content 明文
 * @returns {string}
 */
const _md5 = (content) => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 *
 * @param {string} content 明文
 */
const doCrypto = (content) => {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = {
  doCrypto
}
