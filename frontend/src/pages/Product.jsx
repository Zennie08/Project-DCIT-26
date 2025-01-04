import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {

    products.map((item)=>{
      if(item._id === productId) {
        setProductData(item)
        setImage(item.image[0])  
                    
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>


            {/* Product Info */}
            <div className='flex-1'>
              <h1 className='font-medium md:text-2xl lg:text-4xl mt-2 '>{productData.name}</h1>
              <div className='flex items-center gap-1 my-6 text-2xl'>
                <img src={assets.star_icon} alt="" className="w-15 " />
                <img src={assets.star_icon} alt="" className="w-15 " />
                <img src={assets.star_icon} alt="" className="w-15 " />
                <img src={assets.star_icon} alt="" className="w-15 " />
                <img src={assets.star_dull_icon} alt="" className="w-15 " />
                <p className='pl-2 text-3xl'>(122)</p>
              </div>
              <p className='mt-6  md:text-4xl text-4xl lg:text-5xl font-medium'>{currency} {productData.price}</p>
              <p className='mt-6 text-gray-500 md:w-5/5 lg:text-2xl'>{productData.description}</p>
              <button onClick={()=>addToCart(productData._id)} className='bg-yellow-500 text-white px-20 py-3 mt-10 text-lg active:bg-yellow-400 '>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='sm:text-sm md:text-md lg:text-lg text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Orignal product.</p>
                <p>Cash on delivery is availble on this product.</p>
                <p>Easy return and exhange policy within 7 days.</p>
              </div>
              <hr className='mt-8 sm:w-4/5'/>
            </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20'>
            <div className='flex'>
              <p className='border px-5 py-3 text-sm'>Description</p>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>This product is the best</p>
              <p>This product is the best</p>
            </div>
      </div>

      {/* Display related products */}
      
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
