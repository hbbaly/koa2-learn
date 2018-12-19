const Koa = require('koa');
const app = new Koa()

const main = (ctx) => {
  ctx.body = '<H1> koa2 demo1</H1>'
}
app.use(main)
app.listen(3000)   // app.listen(3000)  是 http.createServer(app.callback()).listen(3000); 的语法糖