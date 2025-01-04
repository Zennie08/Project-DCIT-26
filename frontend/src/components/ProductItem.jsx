import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);

  return (

    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='bg-yellow-100 rounded shadow-md'>
      <div className='overflow-hidden'>
        <img className='hover:scale-100 transition ease-in-out rounded mb-2' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-lg px-2 font-bold'>{name}</p>
      <p className='text-lg font-medium mb-10 px-2 py-2'>{currency} {price}</p>
      </div>
    </Link>
  )
}

export default ProductItem
