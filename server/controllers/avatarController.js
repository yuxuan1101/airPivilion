/**
 * Created by yuxuan on 9/6/16.
 */
// const User = require('../models/user')
const send = require('koa-send')
const path = require('path')
const fs = require('fs')
module.exports = {
  getAvatar: async function getAvatar (ctx, next) {
    let avatar = ctx.params.id
    let avatarDir = path.join(__dirname, '../static/avatar')
    await send(ctx, avatar, {root: avatarDir})
    if (ctx.status === 404) await send(ctx, 'default-1.jpg', {root: avatarDir})
  },
  setAvatar: async function getAvatar (ctx, next) {
    let id = ctx.state.id
    let filePath = ctx.request.body.files.file.path
    if (ctx.status === 401) {
      // if Unauthorized delete file
      fs.unlink(filePath)
      return
    }
    try {
      await new Promise((resolve, reject) => {
        fs.rename(filePath, path.join(filePath, '../' + id), err => {
          if (err) reject(err)
          resolve()
        })
      })
    } catch (err) {
      ctx.status = 500
      return
    }
    ctx.status = 200
  }
}
