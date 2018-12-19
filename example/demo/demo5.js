/// koa-router

const Koa = require('koa')

const app = new Koa()

const Router  = require('koa-router')
/// new Router
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