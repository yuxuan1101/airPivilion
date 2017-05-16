/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const send = require('koa-send')
const path = require('path')
module.exports = {
  getAvatar: async function authUser (ctx, next) {
    console.log(ctx.query.avatar)
    let avatar = ctx.query.avatar
    let avatarDir = path.join(__dirname, '../static/avatar')
    await send(ctx, avatar, {root: avatarDir})
    if (ctx.status === 404) await send(ctx, 'default-1.jpg', {root: avatarDir})
  }
}
