const RedisStore = require('./RedisStore')

class OnlineUserStore extends RedisStore {
  constructor (type = '', opts = {}) {
    super(type, opts)
  }

}

module.exports = {
  onlineUserStore: new OnlineUserStore('onlineUser', {clean: true})
}
