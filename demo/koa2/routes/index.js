const router = require('koa-router')()
const API = require('../api/index') 
router.get('/', async (ctx, next) => {
  let hotList = []
  await Promise.all([API.hotRepair()]).then(([data]) => {
    hotList = data.data.hotList
  })
  
  await ctx.render('index', {
    title: 'CNode：Node.js专业中文社区',
    hotList:hotList
  })
  
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
