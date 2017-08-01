/**
 * Created by yuxuan on 8/11/16.
 */
'use strict'

const Router = require('koa-router')
const user = require('../controllers/userController')
const auth = require('../controllers/authController')

const router = new Router()

router.get('/', auth.isAuthenticated, user.getUser)

router.post('/', user.createUser, auth.authUser)

router.put('/:id/:key', user.putUser)
// router.put('/:id/avatar', async function (ctx) {
//   console.log('into avatar')
// })

module.exports = router
