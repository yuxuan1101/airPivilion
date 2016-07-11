const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const send = require('koa-send');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
// const users = require('./routes/users');
const getData = require('./routes/getData');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/dist'));

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
    await send(ctx, 'index.html');
  }
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/getData', getData.routes(), getData.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;