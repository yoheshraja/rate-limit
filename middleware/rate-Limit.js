const rateLimit=require("express-rate-limit")
const loginLimit=rateLimit({
    windowMs:60*1000,
    limit:1,
    message:{
        success:false,
        message:"Too many login attempts. Try again later."
    },
    standardHeaders:true,
    legacyHeaders:false
})
module.exports=loginLimit