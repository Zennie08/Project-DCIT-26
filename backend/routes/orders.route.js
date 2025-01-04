import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/order.controller.js'
import adminAuth from '../middleware/admin.auth.js';
import authUser from '../middleware/user.auth.js';

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment Features
orderRouter.post('/place',authUser, placeOrder)

//User Feature
orderRouter.post('/user-orders',authUser, userOrders)

export default orderRouter;