/**
 * Created by yuxuan on 9/6/16.
 */
'use strict'

const Router = require('koa-router')
const avatar = require('../controllers/avatarController')
const auth = require('../controllers/authController')

const router = new Router()

router.get('/', avatar.getAvatar)
router.post('/', auth.isAuthenticated, avatar.setAvatar)

module.exports = router
