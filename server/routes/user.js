/**
 * Created by yuxuan on 8/11/16.
 */
'use strict'

const Router = require('koa-router')
const user = require('../controllers/userController')
const auth = require('../controllers/authController')

const router = new Router()

router.get('/', auth.getAuth, async (ctx, next) => {
  console.log('into user')
  // send(ctx, 'index.html');
  ctx.body = {
    username: '111'
  }
})

router.post('/', user.createUser, auth.authUser)

module.exports = router
