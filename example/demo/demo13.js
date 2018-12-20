// ctx.throw

// try {
  
//} catch (error) {
  
//}

// app.emit  

// app.on

const Koa = require('koa')
const app = new Koa()

// 使用 try catch 监控报错，为了方便处理错误，
// 最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。
const handler = async (ctx,next) => {
  try{
    await next()
  }catch(err){
    ctx.body = 'this is swrong'
    //  如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。
    app.emit('error',err,ctx)
  }
}

// 抛出错误  ctx.throw()方法，用来抛出错误，
const main = ctx => {
  ctx.throw({code:500,msg:'wrong'})
}

// 监听报错触发  运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。
app.on('error',(err)=>{
  console.log(err)
})

app.use(handler)
app.use(main)
app.listen(3000)