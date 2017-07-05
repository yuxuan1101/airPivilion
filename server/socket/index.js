/**
 * Created by yuxuan on 9/13/16.
 */
const SocketRouter = require('./SocketRouter')
const {getUserList, postUserList, deleteUserList} = require('./middlewares/onlineUserList')
let socketRouter = new SocketRouter()
socketRouter.post('/userlist', postUserList, getUserList, async function (ctx) {
  ctx.socket.broadcast.emit('push_user_list', ctx.response)
})
socketRouter.delete('/userlist', deleteUserList, getUserList, async function (ctx) {
  ctx.socket.broadcast.emit('push_user_list', ctx.response)
})
socketRouter.get('/userlist', getUserList, async function (ctx) {
  ctx.socket.emit('push_user_list', ctx.response)
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
      socketRouter.handle('delete', '/userlist', {
        socket: socket,
        req: {params: socketId}
      })
      console.log(socketId + 'disconnect')
    })
  })
}
