/**
 * Created by yuxuan on 9/13/16.
 */
// const passport = require('koa-passport')

module.exports = function (io) {
  let userList = []
  io.on('connect', function (socket) {
    // 设置TCP连接超时时间
    socket.emit('othersLogin', userList)
    socket.on('login', (info, next) => {
      // passport.deserializeUser
      console.log(info + ' login')
    })
  })
}
