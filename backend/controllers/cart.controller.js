import userModel from "../models/user.model.js";


// Add products to user cart 
const addToCart = async (req, res) => {
  try {
    // Use userId from the decoded token (set by authUser middleware)
    const { itemId } = req.body;
    const userId = req.userId;  // This comes from the token
    
    // Fetch user data
    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Initialize cartData if it doesn't exist
    let cartData = userData.cartData || {};

    // Update cartData
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    // Save updated cartData
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Added to Cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


  

// Update User Cart
const updateCart = async (req, res) => {
    try {
        const userId = req.userId
        const { itemId, quantity} = req.body

        const userData = await userModel.findById(userId); 
        let cartData = userData.cartData || {};

        cartData[itemId] = quantity
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.error(error);
      res.json({ success: false, message: error.message });
    }
}

// Get User Cart 
const getUserCart = async (req, res) => {
  try {
      const userId = req.userId;

      const userData = await userModel.findById(userId); 

      if (!userData) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {};

      res.json({ success: true, cartData });

  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};



export { addToCart, updateCart, getUserCart}