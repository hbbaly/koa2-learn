  // 异步中间件   fs.readFile 可以异步读取文件

  const fs = require('fs.promised')

  const Koa = require('koa')
  const app = new Koa()

  const main = async (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = await fs.readFile('./demo/index.html','utf-8')
  }
  app.use(main)
  app.listen(3000)
