const mongoose = require('mongoose');
const { Schema } = mongoose;

const WebSchema = new Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Template:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    Experience:{
        type:String,
        required:true
    },
    Project:{
        type:String,
        required:true
    },
    Client:{
        type:String,
        required:true
    },
    Objective:{
        type:String,
        required:true
    },
    Images:[
        {
            Image:{
                type:String,
            }
        }
    ]
})

module.exports = mongoose.model("WebSchema",WebSchema)