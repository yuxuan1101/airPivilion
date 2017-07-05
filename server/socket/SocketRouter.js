let methods = [
  'GET',
  'PUT',
  'PATCH',
  'POST',
  'DELETE'
  // 'ALL'
]
function SocketRouter (opts) {
  if (!(this instanceof SocketRouter)) {
    return new SocketRouter(opts)
  }
  this.stack = {}
}
methods.forEach(function (method) {
  SocketRouter.prototype[method.toLowerCase()] = function (path, ...middleware) {
    this.register(path, method, middleware)
    return this
  }
})
SocketRouter.prototype.register = function (path, method, middleware) {
  this.stack[method.toUpperCase() + ' ' + path] =
    compose(Array.isArray(middleware) ? middleware : [middleware])
  // 呃，从koa2 源码抄下来的。。。
  function compose (middleware) {
    // 参数检验
    return function (ctx, next) {
      // last called middleware #
      let index = -1
      return dispatch(0)
      function dispatch (i) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = middleware[i]
        // 最后一个中间件的调用
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve()
        // 用Promise包裹中间件，方便await调用
        try {
          return Promise.resolve(fn(ctx, function next () {
            return dispatch(i + 1)
          }))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
}
SocketRouter.prototype.handle = function (method, path, ctx) {
  if (!ctx) ctx = {}
  this.stack[method.toUpperCase() + ' ' + path](ctx)
}

module.exports = SocketRouter
