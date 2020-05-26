var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport-k4', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("ket noi database tahnh cong");
});
module.exports= mongoose