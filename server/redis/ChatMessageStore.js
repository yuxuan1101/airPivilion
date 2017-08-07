const RedisStore = require('./RedisStore')

class ChatMessageStore extends RedisStore {
  constructor (type = '', opts = {}) {
    super(type.toUpperCase(), opts)
  }
  /**
   * @return Integer delete count
   */
  async clean () {
    return await this.redis.del(this.type)
  }
  async getAll (opts) {
    let result = await this.redis.lrange(this.type, 0, -1)
    return result.map(item => JSON.parse(item))
  }
  async set ({ data = {} }) {
    try {
      await this.redis.rpush(this.type, JSON.stringify(data))
    } catch (e) {}
    return null
  }
}

module.exports = {
  chatMessageStore: new ChatMessageStore('chatMessage', {clean: false})
}
