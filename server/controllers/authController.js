/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const passport = require('koa-passport')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
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
  isAuthenticated: async function getAuth (ctx, next) {
    console.log('into getAuth')
    const token = ctx.header.authorization
    try {
      const userMessage = jwt.verify(token, config.token)
      ctx.state.id = userMessage.id
    } catch (e) {
      ctx.status = 401
    }
    await next()
  }
}
