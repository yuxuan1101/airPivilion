/**
 * Created by yuxuan on 8/11/16.
 */
const Router = require('koa-router')
const send = require('koa-send')

const user = require('./user')
const auth = require('./auth')
const avatar = require('./avatar')

const router = new Router()

router.get('/', async (ctx, next) => {
  send(ctx, 'index.html')
})

router.use('/user', user.routes(), user.allowedMethods())
router.use('/auth', auth.routes(), auth.allowedMethods())
router.use('/avatar', avatar.routes(), avatar.allowedMethods())

module.exports = router
