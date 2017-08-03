const Redis = require('ioredis')
const redis = new Redis()
class RedisStore {
  constructor (type = '', opts = {}) {
    this.type = type
    this.redis = redis
    // clean old data.
    if (opts.clean) this.clean().then(result => console.log(`del old keys ${result}`))
  }
  /**
   * @return Integer delete count
   */
  async clean () {
    let allKeys = await this.findAllKeys()
    if (!allKeys.length) return 0
    return await this.redis.del(...allKeys)
  }
  /**
   * @return [...keys]
   */
  async findAllKeys () {
    return await new Promise(resolve => {
      this.redis.scanStream({
        match: `${this.type.toUpperCase()}:*`,
        count: 100
      }).on('data', resultKeys => resolve(resultKeys))
    })
  }
  /**
   * 获取符合条件的所有key的值
   * @param {*} opts
   *  except:[...sid] || sid
   *  sort: Function || 'reverse'
   * @return [...values]
   */
  async getAll (opts) {
    if (!opts) opts = {}
    let except = Array.isArray(opts.except) ? opts.except : [opts.except]
    // except = except.map(item => `${this.type.toUpperCase()}:${item}`)
    let allKeys = await this.findAllKeys()
    let needKeys = allKeys.filter(key =>
      !except.includes(key.slice(this.type.length + 1)))
    if (!needKeys.length) return []

    if (opts.sort === 'reverse') needKeys.reverse()
    else if (typeof opts.sort === 'function') needKeys.sort(opts.sort)
    let result = await this.redis.mget(...needKeys)
    return result.map(item => JSON.parse(item))
  }

  async get (sid) {
    let data = await this.redis.get(`${this.type.toUpperCase()}:${sid}`)
    return JSON.parse(data)
  }

  async set ({ data = {}, sid = this.getID(24), maxAge = 1000000 } = {}) {
    try {
      await this.redis.set(`${this.type.toUpperCase()}:${sid}`, JSON.stringify(data), 'EX', maxAge / 1000)
    } catch (e) {}
    return sid
  }

  async destroy (sid) {
    return await this.redis.del(`${this.type.toUpperCase()}:${sid}`)
  }
}

module.exports = {
  onlineUserStore: new RedisStore('onlineUser', {clean: true}),
  chatMessageStore: new RedisStore('chatMessage')
}
