const server = require('../server')

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

let COOKIE = ''

test('注册一个用户，应该成功', async () => {
  const res = await server.post('/api/user/register')
    .send(testUser)
  console.log(res.body.errno)
  expect(res.body.errno).toBe(0)
})

test('重复注册用户，应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})

test('查询用户，应该存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({userName})
  expect(res.body.errno).toBe(0)
})

test('json schema 检测，非法格式，应该失败', async () => {
  const res = await server
    .post('/api/user/register')
    .send({userName: '123', password: 'a', gender: 'mad'})
  expect(res.body.errno).not.toBe(0)
})

test('登录，应该成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({userName, password})
  expect(res.body.errno).toBe(0)

  COOKIE = res.headers['set-cookie'].join(';')
})

test('修改基本信息应该成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '测试昵称',
      city: '测试城市',
      picture: '/test.png'
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

test('修改密码，应该成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `p_${Date.now()}`
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

test('退出登录应该成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

test('删除用户，应该成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

test('json schema 检测，非法格式，应该失败', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({userName})
  expect(res.body.errno).not.toBe(0)
})
