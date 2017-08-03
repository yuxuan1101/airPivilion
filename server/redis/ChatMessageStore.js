const RedisStore = require('./RedisStore')

class ChatMessageStore extends RedisStore {
  constructor (type = '', opts = {}) {
    super(type, opts)
  }

}

module.exports = {
  chatMessageStore: new ChatMessageStore('chatMessage', {clean: true})
}
