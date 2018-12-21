//  use ejs  使用方法

// <% code %>用于执行其中javascript代码。


//  for 循环
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


// if 语句
    // <% if(isLogin){ %>
  //     <div class="user">
  //     <a href="">Jack</a>
  //     <a href="">退出</a>
  // </div>
  // <% }else{ %>
  // <div class="login">
  //     <a href="">登录</a>
  //     <a href="">注册</a>
  // </div>
  // <% } %>


  // 模板嵌套

//   <% include 嵌套模板路径 %>
// <% include ./header %>

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