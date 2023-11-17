const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    username:{type:String, required:true, index:{unique:true}},
    email:{type:String, required:true, index:{unique:true}},
    image:{
        data:String,
        contentType:String,
   },
    gender:{type:String},
    birthadate:{type:String},
    password:{type:String, required:true}
})

module.exports.Users = mongoose.model('users',UserSchema);