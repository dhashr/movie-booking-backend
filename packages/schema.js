let mongoose = require('mongoose')
let schema = new mongoose.Schema(
    {
        firstname:{type:String,required:true,minlength:4},
        lastname:{type:String,required:true},
        mobile_no:{type:Number,required:true,unique:true,length:10},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true,minlength:8},
        c_password:{type:String,required:true,minlength:8}
    },
    {
        collection:"signup"
    }
)
module.exports = mongoose.model('list1',schema)