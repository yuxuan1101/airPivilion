const {onlineUserStore} = require('../../redis/OnlineUserStore')
const User = require('../../models/user')

module.exports = {
  /**
   * @ctx.req.params string||integer user.id
   */
  postUserList: async function (ctx, next) {
    let userId = ctx.req.params
    await onlineUserStore.set({data: userId || 'unsigned', sid: ctx.socket.id})
    next()
  },
  deleteUserList: async function (ctx, next) {
    let socketId = ctx.req.params
    await onlineUserStore.destroy(socketId)
    next()
  },
  /**
   * @ctx.response {
   *  userList: Array [...Object]
   *  unsignedVisitors: Array [...socketID]
   * }
   */
  getUserList: async function (ctx, next) {
    ctx.response = await onlineUserStore.getAll()
    next()
  }
}
