const Koa = require('koa')
const app = new Koa()

// 使用 try catch 监控报错，这个先使用
const handler = async (ctx,next) => {
  try{
    await next()
  }catch(err){
    ctx.body = 'this is swrong'
    app.emit('error',err,ctx)
  }
}

// 抛出错误
const main = ctx => {
  throw({code:500,msg:'wrong'})
}

// 监听报错触发
app.on('error',(err)=>{
  console.log(err)
})

app.use(handler)
app.use(main)
app.listen(3000)