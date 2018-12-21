# koa2
  **介绍koa2的基础知识**

- ## 安装

    ```
    npm init -y    //npm初始化文件夹
     
    npm i koa   // 安装 koa2
    ```
- ## demo1

    ```
    const Koa = require('koa')  // 引入koa
    const app = new Koa()  // 初始化koa

    const main = (ctx) => {
      ctx.body = '<H1> koa2 demo1</H1>'
    }
    app.use(main)   // 使用
    app.listen(3000)   // app.listen(3000)  是 http.createServer(app.callback()).listen(3000); 的语法糖。
    ```
- ## demo2 

    `request.accepts(types)`  检查给定的 `type(s)` 是否可以接受

    ```
    const Koa = require('koa');
    const app = new Koa()

    const main = (ctx) => {

      if(ctx.request.accepts('xml')){

        ctx.response.type = 'xml'
        ctx.response.body = '<data>Hello World xml</data>'

      }else if(ctx.request.accepts('text')){

        ctx.response.type = 'text'
        ctx.response.body = 'hello world text'

      }else if(ctx.request.accepts('json')){

        ctx.response.type = 'json'
        ctx.response.body = '{data:"hello world json"}'

      }else if (ctx.request.accepts('html')){

        ctx.response.type = 'html'
        ctx.response.body = '<h1>hello world html</h1>'

      }else{

        ctx.response.type = 'text'
        ctx.response.body = 'hello world text'

      }
    }

    app.use(main)
    app.listen(3000)
    ```

- ## demo3

    ```
    const Koa = require('koa')
    const app = new Koa()

    // fs 文件系统模块(node)
    const fs = require('fs')

    // 际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户

    const main = ctx => {
      ctx.response.type = 'html'

      // fs.createReadStream(path[, options]),打开一个刻度的文件流，返回ReadStream 对象。
      ctx.response.body = fs.createReadStream('./demo/index.html')
    }

    app.use(main)
    app.listen(3000)
    ```

- ## demo4

    `ctx.request.url` 可以获得请求路径

    ```
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
    ```

- ## demo5 

    `koa-router` 基础使用

    ```
    // koa-router
    const Koa = require('koa')
    const app = new Koa()

    // 创建路由
    const Router  = require('koa-router')
    const router = new Router();

    const user = (ctx) => {
      ctx.response.body = '这里是user页面'
    }

    const about = (ctx) => {
      ctx.response.body = '这里是about页面'
    }

    const index = (ctx) => {
      ctx.response.body = '这里是index页面'
    }

    router.get('/',index)
    router.get('/user',user)
    router.get('/about',about)

    // 将 router注册到app对象上面
    app.use(router.routes())
    app.listen(3000)
    ```

- ## demo7

    中间件执行顺序   以"**先进后出**"`（first-in-last-out）`的顺序执行

    ```
    const Koa = require('koa')
    const app = new Koa()

    const first = (ctx,next) => {
      console.log('first in')   
      next()
      console.log('first out')
    }

    const second = (ctx,next) => {
      console.log('second in')  
      next()
      console.log('second out')
    }

    const third = (ctx,next) => {
      console.log('third in')
      next()
      console.log('third out')
    }

    app.use(first)
    app.use(second)
    app.use(third)
    app.listen(3000)


    // first in
    // second in 
    // third in 
    // third out 
    // second out
    // first out
   ```

- ## demo8

    异步读取文件

    ```
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
    ```

- ## demo9

    `koa-compose`模块的`compose`方法，把多个中间件数组合并成一个大的中间件函数

    ```
    const Koa = require('koa')
    const app = new Koa()
    const compose = require('koa-compose')

    const first = (ctx,next) => {
      next()
    }

    const second = (ctx,next) => {
      next()
    }

    const third = (ctx,next) => {
      next()
    }

    const forth = (ctx,next) => {
      ctx.response.body = 'koa-compose的使用'
      next()
    }

    const middleware = compose([first,second,third,forth])

    //执行这个中间件函数fn，进而会把所有的中间件函数依次执行
    app.use(middleware)
    app.listen(3000)
    ```