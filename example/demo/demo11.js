// koa 中的get请求，及获取参数方式
// query：返回的是格式化好的参数对象。
// querystring：返回的是请求字符串。


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

// {"url":"/?name=hbb&age=20","query":{"name":"hbb","age":"20"},"queryString":"name=hbb&age=20","ctxQuery":{"name":"hbb","age":"20"},"ctxQueryString":"name=hbb&age=20"}