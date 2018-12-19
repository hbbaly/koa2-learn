const Koa = require('koa')
const app = new Koa()
// ctx.request.url 获得请求路径
const main = ctx => {
  if (ctx.request.url === '/') {
    ctx.response.type = 'html'
    ctx.response.body = '<h1>Index page</h1>'
  } else {

  }
}