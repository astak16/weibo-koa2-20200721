const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('auto ok')
}).catch(() => {
  console.log('auth err')
})

seq.sync({force: true}).then(() => {
  process.exit()
})
