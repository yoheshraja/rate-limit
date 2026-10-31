const mongoose = require("mongoose")

const ConnectDB=async()=>{
    await mongoose.connect("mongodb://localhost:27017/Authentication")
    .then(()=>console.log("DB connected"))
    .catch((error)=>console.log(error))
}
module.exports=ConnectDB