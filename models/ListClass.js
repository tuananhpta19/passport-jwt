var mongoose = require("../config/dbConnect")
var Schema = mongoose.Schema;
var classSchema= new Schema({
    name:String
})
var ClassModel = mongoose.model("class",classSchema);
module.exports=ClassModel;