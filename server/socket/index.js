/**
 * Created by yuxuan on 9/13/16.
 */
// const passport = require('koa-passport')

module.exports = function (io) {
  let userList = {}
  io.on('connect', function (socket) {
    // 设置TCP连接超时时间
    console.log(socket.id + 'connect')
    userList[socket.id] = {signed: false}
    socket.broadcast.emit('othersLogin', userList)
    socket.on('login', (user, next) => {
      console.log(user.username + ' login')
      userList[socket.id] = user
      socket.broadcast.emit('othersLogin', userList)
    })
    socket.on('disconnect', () => {
      delete userList[socket.id]
      console.log(socket.id + 'disconnect')
    })
  })
}
