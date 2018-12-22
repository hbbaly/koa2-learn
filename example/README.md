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

- ## demo10

    `koa-static`的使用,设置静态资源目录


    ```
    const Koa = require('koa')
    const app = new Koa()
    const path = require('path')
    const  serve = require('koa-static')

    const staticPath = './static'
    const main = serve(path.join(__dirname,staticPath))

    app.use(main)
    app.listen(3000)
    ```

    访问 `locallhost:3000/loading.gif`

- ## demo11

    koa 中的get请求，及获取参数方式

    ```
    const Koa = require('koa')
    const app = new Koa()

    const main = ctx => {
      let url = ctx.url
      let request = ctx.request
      let query = request.query
      let queryString = request.querystring
      ctx.response.body = {
        url,
        query,
        queryString,
        ctxQuery:ctx.query,
        ctxQueryString:ctx.querystring
      }
    }

    app.use(main)
    app.listen(3000)

    // http://localhost:3000/?name=hbb&age=20
    
    输出结果为：

    {
      "url":"/?name=hbb&age=20",
      "query":{"name":"hbb","age":"20"},
      "queryString":"name=hbb&age=20",
      "ctxQuery":{"name":"hbb","age":"20"},
      "ctxQueryString":"name=hbb&age=20"
    }
    ```

    `query`：返回的是格式化好的参数对象。

    `querystring`：返回的是请求字符串。

- ## demo12

    post 请求

    ```
    const Koa = require('koa')
    const app = new Koa()
    const bodyParse = require('koa-bodyparser')

    const main = ctx => {

      if(ctx.url==='/' && ctx.method==='GET'){

          //显示表单页面
          let html=`
              <h1>Koa2 request POST</h1>
              <form method="POST" action="/">
                  <p>userName</p>
                  <input name="userName" /><br/>
                  <p>age</p>
                  <input name="age" /><br/>
                  <p>website</p>
                  <input name="webSite" /><br/>
                  <button type="submit">submit</button>
              </form>
          `;

          ctx.body=html;

      }else if(ctx.url==='/' && ctx.method==='POST'){

          let postData= ctx.request.body;
          ctx.body=postData;

      }else{

          ctx.body='<h1>404!</h1>';
      }
    }

    app.use(bodyParse())
    app.use(main)
    app.listen(3000)
    ```

- ## demo13

    错误相关处理

    ```
    const Koa = require('koa')
    const app = new Koa()

    const handler = async (ctx,next) => {

      try{
        await next()
      }catch(err){
        ctx.body = 'this is swrong'
        //  如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。
        app.emit('error',err,ctx)
      }

    }

    // 抛出错误  ctx.throw()方法，用来抛出错误，
    const main = ctx => {
      ctx.throw({code:500,msg:'wrong'})
    }

    // 监听报错触发  运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。
    app.on('error',(err)=>{
      console.log(err)
    })

    app.use(handler)
    app.use(main)
    app.listen(3000)
    ```

    使用 `try catch` 监控报错，为了方便处理错误。

    最好使用`try...catch`将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。


- ## demo14

    cookie 相关操作

    ```
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
    ```

    `koa`的上下文（`ctx`）直接提供了读取和写入的方法。

    `ctx.cookies.get(name,[optins])`:读取上下文请求中的cookie。
    
    `options`中的参数：

    |属性名|含义|
    |---|:--:|
    |domain|cookie所在的域名|
    |path |cookie所在的路径|
    |maxAge|cookie有效时长|
    |expires|cookie失效时间|
    |httpOnly|否只用于http请求中获取|
    |overwrite|是否允许重写|

    **例如**

    domain:'127.0.0.1', // 写cookie所在的域名

    path:'/index',       // 写cookie所在的路径

    maxAge:1000*60*60*24,   // cookie有效时长

    expires:new Date('2018-12-31'), // cookie失效时间

    httpOnly:false,  // 是否只用于http请求中获取

    overwrite:false  // 是否允许重写


    **设置cookie**
    
    `ctx.cookies.set(name,value,[options])`：在上下文中写入`cookie`。

- ## demo15

    **路由层级**

    **添加前缀**

    ```
    const Koa = require('koa')
    const Router = require('koa-router')
    const app = new Koa()

    const router = new Router({
      prefix:'/h5'
    })

    router.get('/',(ctx)=>{
      ctx.body = ctx.url     //相当于在localhost:3000/h5 为首页
    })

    app.use(router.routes())
    app.listen(3000)
    ```

- ## demo16
    **路由嵌套**

    ```
    const Koa = require('koa');
    const app = new Koa();
    const Router = require('koa-router');
    // 创建user父级目录
    const user = new Router()

    // 创建个人中心和支付页面
    user.get('/index',ctx => {
      ctx.body = '个人中心'
    })
    user.get('/pay', ctx => {
      ctx.body = '支付页面'
    })

    // 创建 appraise 父级目录
    const appraise = new Router()
    // 创建 评价首页和评价详情
    appraise.get('/index',ctx => {
      ctx.body = '评价页面'
    })
    appraise.get('/detail',ctx => {
      ctx.body = '评价详情页面'
    })

    // //装载所有子路由
    const router = new Router()
    router.use('/user',user.routes(),user.allowedMethods())
    router.use('/appraise',appraise.routes(),appraise.allowedMethods())

    //加载路由中间件
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000);
    ```

- ## demo17 

    **koa-views**以及模板引擎**ejs**的使用

    ```
    const Koa = require('koa');
    const app = new Koa();
    const path = require('path')
    const views = require('koa-views')

    // 引用模板引擎   创建views目录，创建index.ejs
    app.use(views(path.join(__dirname,'./views'),{
      extension:'ejs'
    }))

    // 渲染模板引擎
    const main = async ctx => {
      let title = 'ejs'
      await ctx.render('index',{
        title
      })
    }

    app.use(main)
    app.listen(3000)
    ```


- ## demo18

    **ejs**模板语法

    - `<%= code %>` 特殊字符将进行转义   输出变量。

    - `<% code %>` 用于执行其中javascript代码。

    - `for` 循环

    ```
     <!-- 定义一组数组 -->  循环使用
    <% users=["Jack","Rose","Alice","Ave"] %>
    <ul>
      <% for(var item in users){ %>
        <li><%= users[item] %></li>
      <% } %>
    </ul>
    ```

    -  `if` 语句

    ```
    <% if(isLogin){ %>
      <div class="user">
        <a href="">Jack</a>
        <a href="">退出</a>
      </div>
    <% }else{ %>
      <div class="login">
        <a href="">登录</a>
        <a href="">注册</a>
      </div>
    <% } %>
    ```

    - 模板嵌套

    ```
    <% include 嵌套模板路径 %>
    ```

    在demo18中demo1.ejs模板中引入demo2模板

    ```
    <% include ./header %>
    ```



