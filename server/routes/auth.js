/**
 * Created by yuxuan on 9/6/16.
 */
'use strict';

const Router = require('koa-router');
const send = require('koa-send');
const auth = require('../controllers/authController');

const router = new Router();

router.post('/', auth.authUser)

module.exports = router;