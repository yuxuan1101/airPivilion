const Koa = require('koa');
const app = new Koa();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const path = require('path');
const config = require('./config/config');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(path.join(__dirname , '../client/dist'))));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    console.log(ctx.path);
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    console.log(ctx.status);
    if(ctx.status===404&&!ctx.path.match(/\./)) {
        console.log("send html. -"+ ctx.path);
        ctx.type = 'html'
        ctx.body = require('fs').createReadStream(path.join(__dirname , '../client/dist/index.html'))
    }
});

const router = require('./routes/index');
app.use(router.routes(),router.allowedMethods());

app.on('error', function(err, ctx){
    console.log(err)
    logger.error('server error', err, ctx);
});

app.listen(config.app.port,function () {
    console.log("listening at "+config.app.port);
})
// module.exports = app;