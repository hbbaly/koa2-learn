const Koa = require('koa')
const app = new Koa()
// fs 文件系统模块(node)
const fs = require('fs')
// 际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户
const main = ctx => {
  ctx.response.type = 'html'
  // // fs.createReadStream(path[, options]),打开一个刻度的文件流，返回ReadStream 对象。
  ctx.response.body = fs.createReadStream('./demo/index.html')
}
app.use(main)
app.listen(3000)