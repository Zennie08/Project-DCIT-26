import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/product.model.js';

// Function for add product
const addProduct = async (req, res) => {
    try {

        const {name, description, price, bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images =[image1, image2, image3, image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            bestSeller: bestSeller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData)
        await product.save()
        
        
        res.json({success:true, message:"Product Added"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
    
}

// Function for list product
const listProduct = async (req, res) => {
    try {
      const products = await productModel.find({});
  
      res.json({
        success: true, 
        products,
      });
    } catch (error) {
      console.error(error);
  
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
  

// Function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Remove"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}

// Function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}

// Function for update product 
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.query;  // Change this to req.query
    const { name, description, price, bestSeller } = req.body;

    // Get images from request if any
    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(Boolean);

    // Image validation: Allowed types and file size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const isValidFile = (file) => allowedTypes.includes(file.mimetype) && file.size <= maxFileSize;
    images.forEach((image, idx) => {
      if (image && !isValidFile(image)) {
        return res.status(400).json({ success: false, message: `Invalid file type or size for image${idx + 1}` });
      }
    });

    let imagesUrl = [];

    // If new images are uploaded, upload to Cloudinary
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
          return result.secure_url;
        })
      );
    }

    // Prepare the updated product data
    const updatedProductData = {
      name,
      description,
      price: Number(price),
      bestSeller: bestSeller === "true", // Simplified comparison
      date: Date.now(),
    };

    // If new images are uploaded, update the image field
    if (imagesUrl.length > 0) {
      updatedProductData.image = imagesUrl;
    }

    // Find and update the product by ID
    const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedProductData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error); // Changed to console.error for better error logging
    res.status(500).json({ success: false, message: error.message });
  }
};


  


export {addProduct, listProduct, removeProduct, singleProduct, updateProduct}