const mongoose = require('mongoose');
const { Schema } = mongoose;

const WrittenScehma = new Schema({
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
    Email:{
        type:String,
        required:true
    },
    Mobile:{
        type:Number,
        required:true
    },
    Web:{
        type:String,
        required:true
    },
    Facebook:{
        type:String,
        required:true
    },
    Linkdin:{
        type:String,
        required:true
    },
    Twitter:{
        type:String,
        required:true
    },
    Objective:{
        type:String,
        required:true
    },
    EducationDetail:[
        {
            Type:{
                type:String,
                required:true
            },
            University:{
                type:String,
                required:true
            },
            Degree:{
                type:String,
                required:true
            },
            StartYear:{
                type:Number,
                required:true
            },
            Objective:{
                type:String,
                required:true
            }
        }
    ],
    Images:[
        {
            Image:{
                type:String,
            }
        }
    ]
})

module.exports = mongoose.model("WrittenData",WrittenScehma)