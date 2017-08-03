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
    let response = await onlineUserStore.getAll()
    let unsignedVisitors = []
    let ids = []
    let userSocketObj = {}
    Object.keys(response).forEach(socketId => {
      let userId = response[socketId]
      if (userId === 'unsigned') unsignedVisitors.push(socketId)
      else {
        ids.push(userId)
        userSocketObj[userId] = socketId
      }
    })
    let userList = await User.find({_id: {$in: ids}}, '_id username avatar').exec()
    userList = userList.map(user => Object.assign({}, user.toJSON(), {
      socketId: userSocketObj[user._id]
    }))
    ctx.response = {
      userList,
      unsignedVisitors
    }
    next()
  }
}
