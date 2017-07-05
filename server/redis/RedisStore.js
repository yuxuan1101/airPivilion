const Redis = require('ioredis')

class RedisStore {
  constructor (type = '') {
    this.type = type
    this.redis = new Redis()
    // 清空旧数据
    this.clean().then(result => console.log(`del old keys ${result}`))
  }
  async clean () {
    let allKeys = await this.findAllKeys()
    if (!allKeys.length) return 0
    return await this.redis.del(...allKeys)
  }
  async findAllKeys () {
    return await new Promise(resolve => {
      this.redis.scanStream({
      // only returns keys following the pattern of `user:*`${this.type.toUpperCase()}
        match: `${this.type.toUpperCase()}:*`,
      // returns approximately 100 elements per call
        count: 100
      }).on('data', resultKeys => resolve(resultKeys))
    })
  }
  async getAll (opts) {
    if (!opts) opts = {}
    let except = Array.isArray(opts.except) ? opts.except : [opts.except]
    // except = except.map(item => `${this.type.toUpperCase()}:${item}`)
    let allKeys = await this.findAllKeys()
    let needKeys = allKeys.filter(key =>
      !except.includes(key.slice(this.type.length + 1)))
    console.log(`needKeys: ${needKeys}`)
    if (!needKeys.length) return []
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
  onlineUserStore: new RedisStore('onlineUser')
}
