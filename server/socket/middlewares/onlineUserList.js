const {onlineUserStore} = require('../../redis/OnlineUserStore')

module.exports = {
  postUserList: async function (ctx, next) {
    let user = ctx.req.params
    if (!user.socketId) user.socketId = ctx.socket.id
    await onlineUserStore.set({data: user, sid: user.socketId})
    next()
  },
  deleteUserList: async function (ctx, next) {
    let socketId = ctx.req.params
    await onlineUserStore.destroy(socketId)
    next()
  },
  getUserList: async function (ctx, next) {
    let response = await onlineUserStore.getAll()
    ctx.response = response
    next()
  }
}
