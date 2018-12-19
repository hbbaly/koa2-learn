const Koa = require('koa');
const app = new Koa()
 // request.accepts(types)  检查给定的 type(s) 是否可以接受
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