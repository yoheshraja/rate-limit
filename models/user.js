const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    phone:{
        type:Number,
        required:true,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim:true
    },
    password:{
        type:String,
        required:true,
        match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
    }
})
module.exports=mongoose.model("User",userSchema)