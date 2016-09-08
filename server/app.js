const Koa = require('koa');
const app = new Koa();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.Promise = global.Promise
mongoose.connect(config.database)

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
// app.use(session())
app.use(convert(require('koa-static')(path.join(__dirname, '../client/dist'))));

require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  console.log(ctx.status);
  if (ctx.status === 404 && !ctx.path.match(/\./)) {
    console.log("send html. -" + ctx.path);
    ctx.type = 'html'
    ctx.body = require('fs').createReadStream(path.join(__dirname, '../client/dist/index.html'))
  }
});

const router = require('./routes/index');
app.use(router.routes(), router.allowedMethods());

app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx);
});

app.listen(config.app.port, function () {
  console.log("listening at " + config.app.port);
})
// module.exports = app;