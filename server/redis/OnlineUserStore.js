const RedisStore = require('./RedisStore')
const User = require('../models/user')

class OnlineUserStore extends RedisStore {
  constructor (type = '', opts = {}) {
    super(type, opts)
  }
  /**
   * @param {} opts
   * @return {
   *  userList: Array [...Object]
   *  unsignedVisitors: Array [...socketID]
   * }
   */
  async getAll (opts) {
    let allKeys = await this.findAllKeys()
    if (!allKeys.length) return []
    let allValues = await this.redis.mget(...allKeys)

    let unsignedVisitors = []
    let ids = []
    let userSocketObj = {}
    allKeys.forEach((key, index) => {
      let userId = allValues[index]
      let socketId = key.slice(this.type.length + 1)
      if (userId === 'unsigned') unsignedVisitors.push(socketId)
      else {
        ids.push(userId)
        userSocketObj[userId] = socketId
      }
    })
    let userList = await User.find({_id: {$in: ids}}, '_id username avatar').exec()
    userList = userList.map(user => Object.assign({}, user.toJSON(), {
      socketId: userSocketObj[user._id],
      id: user._id
    }))
    return {userList, unsignedVisitors}
  }
  async get (sid) {
    return await this.redis.get(`${this.type.toUpperCase()}:${sid}`)
  }
  async set ({ data = 'unsigned', sid = this.getID(24), maxAge = 1000000 } = {}) {
    try {
      await this.redis.set(`${this.type.toUpperCase()}:${sid}`, data, 'EX', maxAge / 1000)
    } catch (e) {
      throw e
    }
    return sid
  }
}

module.exports = {
  onlineUserStore: new OnlineUserStore('onlineUser', {clean: true})
}
