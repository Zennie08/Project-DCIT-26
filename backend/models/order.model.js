import mongoose, { mongo } from "mongoose";
import _default from "validator";

const orderSchema = new mongoose.Schema ({
    userId: {type: String, required: true},
    items: {type: Array, required: true},
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, required: true, default:'Order Placed'},
    paymentMethod: {type: String, required: true},
    date: {type: Number, required: true},
})

const orderModel = mongoose.model.order || mongoose.model('Order', orderSchema)

export default orderModel;