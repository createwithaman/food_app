import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrder, placeOrder, usersOrder, verifyOrder ,updateOrderStatus } from "../controllers/order.controller.js"


const orderRouter = express.Router()


orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,usersOrder)
orderRouter.get("/list",listOrder)
orderRouter.get("/status",updateOrderStatus)

export default orderRouter