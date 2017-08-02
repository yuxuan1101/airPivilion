/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const send = require('koa-send')
const path = require('path')
module.exports = {
  getAvatar: async function getAvatar (ctx, next) {
    let avatar = ctx.query.avatar ? ctx.query.avatar : 'default-1.jpg'
    let avatarDir = path.join(__dirname, '../static/avatar')
    await send(ctx, avatar, {root: avatarDir})
    if (ctx.status === 404) await send(ctx, 'default-1.jpg', {root: avatarDir})
  },
  setAvatar: async function getAvatar (ctx, next) {
    console.log('into pustUser')
    console.log(ctx.state.id)
    console.log(ctx.request.body.files.file.path)
  }
}
