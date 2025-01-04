import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₱";
  const delivery_fee = 38;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

 
  const [products, setProducts] = useState([]);


  const [token, setToken] = useState(null); 


  const addToCart = async (itemId) => {
    try {

      let cartData = structuredClone(cartItems);


      if (cartData[itemId]) {
        cartData[itemId] += 1;
      } else {
        cartData[itemId] = 1;
      }


      setCartItems(cartData);


      if (token) {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      }

      toast.success("Product Added", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    try {
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          totalCount += cartItems[itemId];
        }
      }
    } catch (error) {
      console.error("Error calculating cart count:", error);
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
 
    const updatedCartItems = structuredClone(cartItems);


    updatedCartItems[itemId] = quantity;

  
    setCartItems(updatedCartItems);


    if (token) {
        try {

            await axios.post(
                `${backendUrl}/api/cart/update`, 
                { itemId, quantity }, 
                { headers: { token } }
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message); 
        }
    }
};



const getUserCart = async (token) => {
    try {
        
        const response = await axios.post(`${backendUrl}/api/cart/get`,{}, { headers: { token } }  );


        
        if (response.data.success) {
            setCartItems(response.data.cartData);  
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);  
    }
};


  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {

      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo) {
        try {
          const quantity = cartItems[itemId];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error(`Error calculating total for item ${itemId}:`, error);
        }
      } else {
        console.warn(`Product with ID ${itemId} not found in products.`);
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
