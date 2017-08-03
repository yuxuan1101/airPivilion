const {onlineUserStore, chatMessageStore} = require('../../redis/RedisStore')

module.exports = {
  postChatMessages: async function (ctx, next) {
    let socketId = ctx.socket.id
    let time = Date.now()
    let user = await onlineUserStore.get(socketId)
    ctx.response = Object.assign({}, ctx.req.params, {from: user, time})
    await chatMessageStore.set({data: ctx.response, sid: socketId + ':' + time})
    next()
  },
  getChatMessages: async function (ctx, next) {
    let response = await chatMessageStore.getAll({sort: 'reverse'})
    ctx.callback(response)
  }
}
