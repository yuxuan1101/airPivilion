/**
 * Created by yuxuan on 9/13/16.
 */
const {onlineUserStore} = require('../redis/RedisStore')
const SocketRouter = require('./SocketRouter')
const {getUserList, postUser} = require('./middlewares/onlineUser')
let socketRouter = new SocketRouter()
socketRouter.post('/user', postUser, getUserList, async function (ctx) {
  ctx.socket.broadcast.emit('push_user_list', ctx.response)
})
socketRouter.get('/userList', getUserList, async function (ctx) {
  ctx.socket.emit('push_user_list', ctx.response)
})
socketRouter.post('/userList', async function (ctx, next) {
  console.log('111111')
  await next()
  console.log('333333')
}, async function (data, next) {
  console.log('222222')
})

module.exports = function (io) {
  io.on('connect', function (socket) {
    // 设置TCP连接超时时间
    var socketId = socket.id
    console.log(socketId + 'connect')
    socket.on('message', function (info) {
      console.log('get socket message:' + info.method + ' ' + info.path)
      socketRouter.handle(info.method, info.path, {
        socket: socket,
        req: {params: info.data}
      })
    })
    socket.on('disconnect', () => {
      onlineUserStore.destroy(socketId)
      console.log(socketId + 'disconnect')
    })
  })
}
