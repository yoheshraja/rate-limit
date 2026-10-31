const express=require("express")
const router=express.Router()
const {register,login}=require("../controller/userController")
const loginLimit=require("../middleware/rate-Limit")
router.post("/register",register)
router.post("/login",loginLimit,login)

module.exports=router