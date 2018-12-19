const Koa = require('koa')
const app = new Koa()
const route = require('koa-route')

const user = (ctx) => {
  ctx.response.body = '这里是user页面'
}
const about = (ctx) => {
  ctx.response.body = '这里是about页面'
}
const index = (ctx) => {
  ctx.response.body = '这里是index页面'
}

app.use(route.get('/',index))
app.use(route.get('/user',user))
app.use(route.get('/about',about))
app.listen(3000)