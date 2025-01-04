import { response } from "express";
import orderModel from "../models/order.model.js"
import userModel from "../models/user.model.js"

// Placing orders using COD Method

const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;  // User ID from the middleware
        const { items, amount, address } = req.body;

        // Ensure the necessary fields are provided
        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Order data
        const orderData = {
            userId,
            address,
            items,
            amount,
            paymentMethod: "COD",  // Fixed the typo here
            date: Date.now(),  // Ensure this is 'date' and not 'data'
        };

        // Create and save the new order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error.message });
    }
};




// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// All Orders data for User
const userOrders = async (req, res) => {
    try {

    const userId = req.userId
    
    const orders = await orderModel.find({userId})
    res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// Update Order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status } = req.body
        
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:' Status Updated'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, allOrders, userOrders, updateStatus }