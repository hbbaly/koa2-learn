// koa-views  模板中间件

// 模板引擎使用  ejs
const Koa = require('koa');
const app = new Koa();
const path = require('path')
const views = require('koa-views')


// 加载模板引擎

app.use(views(path.join(__dirname,'./views'),{
  extension:'ejs'
}))


const main = async ctx => {
  let title = 'ejs'
  await ctx.render('index',{
    title
  })
}
app.use(main)
app.listen(3000)