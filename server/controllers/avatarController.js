/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const send = require('koa-send')
const path = require('path')
module.exports = {
  getAvatar: async function authUser (ctx, next) {
    // let userId = ctx.body
    // let user = await User.findOne({_id: userId}).exec()
    // let avatar = 'default-01.jpg'
    let avatarDir = path.join(__dirname, '../static/avatar')
    await send(ctx, 'default-1.jpg', {root: avatarDir})
  }
}
