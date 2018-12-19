const ware = () => {
  global.console.log('这是一个中间件')
}
module.exports =  () => {
  return async function (ctx,next){
    ware()
    await next()
  }
}