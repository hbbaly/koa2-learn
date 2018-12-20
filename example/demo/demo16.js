 // 路由层级   1.加路由前缀 prefix

 // 2.  

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const user = new Router()


user.get('/index',ctx => {
  ctx.body = '个人中心'
})
user.get('/pay', ctx => {
  ctx.body = '支付页面'
})


const appraise = new Router()
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