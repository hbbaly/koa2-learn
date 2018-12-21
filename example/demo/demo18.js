//  use ejs  使用方法

// <% code %>用于执行其中javascript代码。


// // <%= username %> 特殊字符将进行转义   输出变量     <%= title %>

  // <%- code %> 变量直接输出，不做转义处理

  //  <!-- 定义一组数组 -->  循环使用
    // <% users=["Jack","Rose","Alice","Ave"] %>
    // <ul>
    //     <% for(var item in users){ %>
    //     <li>
    //     <%= users[item] %>
    //     </li>
    //     <% } %>
    // </ul>
const Koa = require('koa')
const path = require('path')
const app = new Koa()

const views = require('koa-views')


const main = async ctx => {
  await ctx.render('demo1',{
    title:'ejs模板',
    isLogin:false
  })
}

app.use(views(path.join(__dirname,'./ejs'),{
  extension:'ejs'
}))
app.use(main)
app.listen(3000)