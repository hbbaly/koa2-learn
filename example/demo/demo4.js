const Koa = require('koa')
const app = new Koa()
// ctx.request.url 获得请求路径
const main = ctx => {
  if (ctx.request.url === '/') {
    ctx.response.type = 'html'
    ctx.response.body = '<h1>Index page</h1>'
  } else {
    ctx.response.type = 'text'
    ctx.response.body = '<h1>text</h1>'
  }
}
app.use(main)
app.listen(3000)