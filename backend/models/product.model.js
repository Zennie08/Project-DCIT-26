import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    bestSeller: {type:Boolean},
    date: {type:Number, required:true}
})

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;