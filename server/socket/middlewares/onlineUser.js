const {onlineUserStore} = require('../../redis/RedisStore')

module.exports = {
  postUser: async function (ctx, next) {
    let user = ctx.req.params
    if (!user.socketId) user.socketId = ctx.socket.id
    await onlineUserStore.set({data: user, sid: user.socketId})
    next()
  },
  getUserList: async function (ctx, next) {
    let response = await onlineUserStore.getAll()
    ctx.response = response
    next()
  }
}
