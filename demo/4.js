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
  // let condition = {title: /^hbb/}
  let condition1 = {title: 'hbb'}
  let multi = {
    multi: true
  }
  let update = {$set : {title : 'hbbaly'}};
  // Test.update(update, function (err, all) {
  //   if (err) console.error(srr)
  //   console.log(all, 'all')  //{ n: 1, nModified: 1, ok: 1 } 'all' 第一个修改完成
  // })
  //  Test.update(condition,update, function (err, all) {
  //   if (err) console.error(srr)
  //   console.log(all, 'all')  //{ n: 1, nModified: 1, ok: 1 } 'all' 修改已hbb开头的第一个
  // })
  Test.update(condition1, update, multi, function (err, all) {
    if (err) console.error(err)
    // console.log(all, 'all')  //{ n: 1, nModified: 1, ok: 1 } 'all' 修改已hbb开头的第一个
    db.close()
  })
  Test.find(function(err, list){
    if (err) console.error(err)
    console.log(list, 'list')
    db.close()
  })
});