var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const testSchema = mongoose.Schema({
    title:String,
    description: String,
    url: String,
    by: String
  });
  let Test = mongoose.model('Test', testSchema);
  let condition = {title: 'hbbaly'}
  let multi = {
    multi: true
  }
  // let update = {$set : {title : 'hbbaly'}};
  // 查询所有Test里面所有的数据
  Test.find(function(err, list){
    if (err) console.error(err)
    console.log(list, 'list')
    db.close()
  })
   /// 选择一个符合条件的
   let projection = 'title description url' // 需要查询的字段
  Test.findOne(condition, projection, function(err, list1){
    if (err) console.error(err)
    console.log(list1, 'list1')
    db.close()
  })
  // count 查询有几条符合条件
  Test.count(condition, function(err, count){
    if (err) console.error(err)
    console.log(count, 'count')
    db.close()
  })
  // Using query builder
  Test.find({ title: /hbb/ }).
  where('by').equals('hbb').
  limit(10).
  sort('-url').
  select('title url by').
  exec(function(err, ll){
    if (err) console.error(err)
    console.log(ll, 'll')
  });
  // With a JSON doc
  Test.find({
    title: /hbb/,
    url: 'hbbaly.com'
  }).
  limit(10).
  sort({ url: -1 }).
  select({ title: 1, url: 1 ,description: 1}).
  exec(function(err, lll){
    if (err) console.error(err)
    console.log(lll, 'lll')
  });

});