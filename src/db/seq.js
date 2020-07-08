const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/db')
const {isProd, isTest} = require('../utils/env')
const {host, user, password, database} = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}
if (isTest)
  conf.logging = () => {} // 关闭打印 SQL 语句

if (isProd)
  conf.pool = {
    max: 5,
    min: 0,
    idle: 1000
  }

const seq = new Sequelize(database, user, password, conf)
module.exports = seq
