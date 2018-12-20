  // cookie

  // koa的上下文（ctx）直接提供了读取和写入的方法。

  // ctx.cookies.get(name,[optins]):读取上下文请求中的cookie。
  // options   
  // domain:'127.0.0.1', // 写cookie所在的域名
  // path:'/index',       // 写cookie所在的路径
  // maxAge:1000*60*60*24,   // cookie有效时长
  // expires:new Date('2018-12-31'), // cookie失效时间
  // httpOnly:false,  // 是否只用于http请求中获取
  // overwrite:false  // 是否允许重写

  // ctx.cookies.set(name,value,[options])：在上下文中写入cookie。

  const Koa = require('koa')
  const app = new Koa()

  const main = ctx => {
    ctx.cookies.set('name','hbb')
    ctx.body = ctx.cookies.get('name')
    
      // 删除 cookie
      ctx.cookies.set('name','hbb',{
        expires:new Date('2018-12-3')
      })
  }

  app.use(main)
  app.listen(3000)