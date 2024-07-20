import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/food.route.js"
import userRouter from "./routes/user.route.js"
import 'dotenv/config'
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"



//app config

const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json()) //req will parse using this 
app.use(cors())//give access backend to frontend

//db connection 
connectDB()

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
