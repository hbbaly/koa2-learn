const Koa = require('koa')
const app = new Koa()
// 使用koa-compose模块的compose方法，把这个中间件数组合并成一个大的中间件函数
const compose = require('koa-compose')
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
const forth = (ctx,next) => {
  console.log('forth in')
  ctx.response.body = 'koa-compose的使用'
  next()
  console.log('forth out')
}

const middleware = compose([first,second,third,forth])
//执行这个中间件函数fn，进而会把所有的中间件函数依次执行

app.use(middleware)
app.listen(3000)