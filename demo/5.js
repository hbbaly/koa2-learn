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
});