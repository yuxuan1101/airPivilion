/**
 * Created by yuxuan on 9/6/16.
 */
const User = require('../models/user');
const passport = require('koa-passport');

module.exports = {
  authUser: async function authUser (ctx, next) {
    return passport.authenticate('local', (user) => {
      if (!user) {
        ctx.throw(401)
      }

      // const token = user.generateToken()

      const response = user.toJSON()

      delete response.password

      ctx.body = {
        // token,
        user: response
      }
    })(ctx, next)
  }
}