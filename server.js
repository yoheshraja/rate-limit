require("dotenv").config();
const express=require("express")
const router=require("./route/userRouter")
const ConnectDB=require("./config/db")
const app=express()
ConnectDB()
app.use(express.json())
app.use("/api",router)
app.listen(process.env.PORT || "5000",()=>{
    console.log("server running")
})