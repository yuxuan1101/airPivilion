/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const send = require('koa-send')
const path = require('path')
const fs = require('fs')
const fileUtils = require('../utils/fileUtils')
const User = require('../models/user')

module.exports = {
  getAvatar: async function getAvatar (ctx, next) {
    let avatar = ctx.params.name
    let avatarDir = path.join(__dirname, '../static/avatar')
    await send(ctx, avatar, {root: avatarDir})
    if (ctx.status === 404) await send(ctx, 'default-1.jpg', {root: avatarDir})
  },
  setAvatar: async function getAvatar (ctx, next) {
    // if Unauthorized delete file
    if (ctx.status === 401) {
      fs.unlink(tmpPath)
      return
    }

    let id = ctx.state.id
    let tmpPath = ctx.request.body.files.file.path
    let fileName = `${id}_${Date.now().toString()}`
    try {
      let avatar = await fileUtils.upload(fileName, tmpPath)
      console.log(await User.findByIdAndUpdate(id, {$set: {avatar: avatar}}).exec())
      ctx.body = {avatar: avatar}
    } catch (err) {
      console.log(err)
      ctx.status = 500
      return
    }
  }
}
