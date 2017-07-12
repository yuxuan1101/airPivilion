module.exports = {
  postChatMessages: async function (ctx, next) {
    let socketId = ctx.socket.id
    ctx.response = Object.assign({}, ctx.req.params, {from: socketId})
    // await onlineUserStore.set({data: user, sid: user.socketId})
    next()
  }
}
