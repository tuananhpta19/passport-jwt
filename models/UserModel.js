var mongoose = require("../config/dbConnect")
var Schema = mongoose.Schema;
var userSchema= new Schema({
    email:String,
    password:String
})
var UserModel = mongoose.model("user",userSchema);
module.exports=UserModel;