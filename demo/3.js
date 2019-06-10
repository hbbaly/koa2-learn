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
  let test1 = new Test({
    title: '测试用例',
    description: '测试用例',
    url: 'hbbaly.com',
    by: 'hbb'
  });
    // 保存到数据库
    test1.save(function (err, cols) {
      console.log(cols, 'clos')
      if (err) return console.error(err);
      Test.find(function (err, col) {
        if (err) return console.error(err);
        console.log(col, 'clo')
        db.close();
      })
    });
});