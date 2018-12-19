// 中间件执行顺序   以"先进后出"（first-in-last-out）的顺序执行
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