// koa-router 中的 路由前缀

// const router = new Router({
//   prefix:'/h5'
// })


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