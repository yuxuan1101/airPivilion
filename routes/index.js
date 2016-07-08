var router = require('koa-router')();
var send = require('koa-send');


router.get('/', async function (ctx, next) {
  await send(ctx, 'views/index.html');
})
module.exports = router;
