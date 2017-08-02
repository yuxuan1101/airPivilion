/**
 * Created by yuxuan on 9/2/16.
 */
const User = require('../models/user')
module.exports = {
  createUser: async (ctx, next) => {
    let user = new User(ctx.request.body)
    let result = await User.findOne({username: user.username}).exec()
    if (!result) {
      user = await user.save()
      await next()
    } else {
      ctx.body = {error: true, errMsg: '此名称已被注册'}
    }
  },
  getUser: async (ctx, next) => {
    const id = ctx.state.id
    try {
      const user = await User.findById(id, '-password -_id')
      const response = user.toJSON()
      ctx.body = Object.assign(response, {id: id})
    } catch (err) {
      ctx.body = {error: true, errMsg: err}
    }
  },
  putUser: async (ctx, next) => {
    console.log('into pustUser')
  }
}
