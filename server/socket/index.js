/**
 * Created by yuxuan on 9/13/16.
 */
// const passport = require('koa-passport')

module.exports = function (io) {
  let userList = {}
  io.on('connect', function (socket) {
    // 设置TCP连接超时时间
    console.log(socket.id + 'connect')
    // console.log(socket.broadcast)
    userList[socket.id] = {username: '游客' + socket.id, signed: false}
    socket.broadcast.emit('othersLogin', Object.values(userList))
    socket.on('login', (user, next) => {
      console.log(user.username + ' login')
      userList[socket.id] = user
      socket.broadcast.emit('othersLogin', Object.values(userList))
    })
    // socket.on('message', function (method, path, data) {

    // })
    socket.on('disconnect', () => {
      delete userList[socket.id]
      console.log(socket.id + 'disconnect')
    })
  })
}
