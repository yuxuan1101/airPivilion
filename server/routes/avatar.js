/**
 * Created by yuxuan on 9/6/16.
 */
'use strict'

const Router = require('koa-router')
const avatar = require('../controllers/avatarController')

const router = new Router()

router.get('/', avatar.getAvatar)

module.exports = router
