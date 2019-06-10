// validation

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  const testSchema = mongoose.Schema({
    name:{
      type: String,
      required:[true,"name 是必须的"],
      maxlength: 12,
      minlength: 2
    },
    age: {
      type: Number,
      min: [6, 'Too few eggs'],
      max: [25,'too many eggs']
    },
    phone: {
      type: String,
      validate: {
        validator: function(data) {
          return /\d{3}-\d{3}-\d{4}/.test(data);
        },
        message: '{VALUE} is not a valid phone number!', //VALUE代表phone存放的值
        kind: "invalid phone"
      }
    }
  });
  let Test = mongoose.model('Test', testSchema);
  let test = new Test({
    name: 'hbb',
    age: 27,
    phone: '400-123-1234'
  })
  test.save(function(err){
    console.error(err.message, 'err')
    db.close()
  })
});