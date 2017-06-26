/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const passport = require('koa-passport')

module.exports = {
  authUser: async function authUser (ctx, next) {
    return passport.authenticate('local', (err, user, info, status) => {
      if (err) {
        console.log(err)
        ctx.body = {error: true, errMsg: err}
        return
      }
      if (info) {
        ctx.body = {error: true, errMsg: info}
        return
      }
      console.log(ctx.request.ip)
      const token = user.generateToken()
      const response = user.toJSON()
      response.id = response._id
      delete response._id
      delete response.password
      ctx.body = {
        token,
        user: response
      }
    })(ctx, next)
  },
  getAuth: async function getAuth (ctx, next) {
    console.log('into getAuth')
    console.log(ctx.header.authorization)
    await next()
  }
}
