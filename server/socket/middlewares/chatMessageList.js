const {onlineUserStore} = require('../../redis/RedisStore')

module.exports = {
  postChatMessages: async function (ctx, next) {
    let socketId = ctx.socket.id
    let user = await onlineUserStore.get(socketId)
    ctx.response = Object.assign({}, ctx.req.params, {from: user})
    next()
  }
}
