var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var kittySchema = mongoose.Schema({
    name: String
  });
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  // methods 必须在model前面
  var Kitten = mongoose.model('Kitten', kittySchema);
  var felyne = new Kitten({ name: 'Felyne' });
  // console.log(felyne.name); // 'Felyne'
  // console.log(felyne.speak())  //Meow name is Felyne
  // 保存到数据库
  felyne.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
  // model 里的所有数据

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })
});