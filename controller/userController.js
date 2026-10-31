const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const register=async (req,res) => {
    const {name,phone,email,password}=req.body;
    if (name.trim().length<3 || name.trim().length>20) {
        return res.status(400).json({
            success:false,
            message:"Name must be 3-20 characters"
        })
    }
    if (String(phone).length!==10) {
         return res.status(400).json({
            success:false,
            message:"phone number must be 10 numbers"
        })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            success:false,
            message:"Enter a valid email address"
        })
    }
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(password)) {
         return res.status(400).json({
            success:false,
            message:"Enter a valid password"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await User.create({
        name,phone,email,password:hashedPassword
    })
    return res.status(201).json({
        success:true,
        message:"Registered successfully"
    })
    
}
const login=async (req,res) => {
    const {email,password}=req.body;
    if (email=="") {
         return res.status(400).json({
            success:false,
            message:"Enter Email address"
        })
    }
    if (password=="") {
        return res.status(400).json({
            success:false,
            message:"Enter valid password"
        })
    }
    const user=await User.findOne({email})
    if (!user) {
          return res.status(400).json({
            success:false,
            message:"User Not Found"
        })
    }
    const matched=await bcrypt.compare(password,user.password)
    if (!matched) {
         return res.status(400).json({
            success:false,
            message:"password not Match"
        })
    }
    const generateToken=(user)=>{
       return jwt.sign({userId:user.id},process.env.JWT_SECRETE,{expiresIn:"15m"})
    }
    const RefreshToken=(user)=>{
       return jwt.sign({userId:user.id},process.env.JWT_SECRETE,{expiresIn:"7d"})
    }

    const AccessToken=generateToken(user)
    const Refresh=RefreshToken(user)
     res.cookie("accessToken",AccessToken,{
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        maxAge:15*60*1000
    })
    res.cookie("RefreshToken",Refresh,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:7*24*60*60*1000
    })
    return res.status(200).json({
        success:true,
        message:"Login success"
    })

}
module.exports={
    register,login
}