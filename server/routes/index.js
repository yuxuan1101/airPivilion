/**
 * Created by yuxuan on 8/11/16.
 */
const Router = require('koa-router');
const send = require('koa-send');

const user = require('./user');

const router = new Router();

router.get('/', async (ctx, next) => {
    send(ctx, 'index.html');
})

router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;