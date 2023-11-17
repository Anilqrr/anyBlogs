const mongoose = require('mongoose')
const {Schema} = mongoose

const BlogShema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    username:{type:String},
    userImage:{type:String},
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports.Blog = mongoose.model('blogs',BlogShema)