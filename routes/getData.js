/**
 * Created by yuxuan on 6/20/16.
 */

var router = require('koa-router')();

router.get('/:id', async (ctx, next) => {
    let id = ctx.params.id;
    
    // ctx.body = 'this a getData response!!';
    ctx.body = {a:id+"abc"};
});

module.exports = router;