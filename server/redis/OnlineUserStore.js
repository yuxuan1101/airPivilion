const RedisStore = require('./RedisStore')

class OnlineUserStore extends RedisStore {
  constructor (type = '', opts = {}) {
    super(type, opts)
  }
  /**
   * @param {} opts
   * @return {socketID: userID || unsigned}
   */
  async getAll (opts) {
    let allKeys = await this.findAllKeys()
    if (!allKeys.length) return []
    let allValues = await this.redis.mget(...allKeys)
    let obj = {}
    allKeys.forEach((key, index) => {
      obj[key.slice(this.type.length + 1)] = allValues[index]
    })
    return obj
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
