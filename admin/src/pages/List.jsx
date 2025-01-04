import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const editProduct = (productId) => {
    // Redirect to the edit page for the selected product
    navigate(`/product/edit/${productId}`);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 font-semibold text-lg">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b className="text-center">Edit</b>
          <b className="text-center">Delete</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border text-sm"
            key={index}
          >
            {/* Product Image */}
            <img className="w-12 h-12 object-cover" src={item.image[0]} alt={item.name} />

            {/* Product Name */}
            <p className="truncate">{item.name}</p>

            {/* Product Price */}
            <p>{currency}{item.price}</p>

            {/* Edit Action */}
            <div className="flex justify-center">
              <img
                onClick={() => editProduct(item._id)}  // Call the editProduct function
                className="w-5 h-5 cursor-pointer"
                src={assets.edit_logo}
                alt="edit"
              />
            </div>

            {/* Delete Action */}
            <div className="flex justify-center">
              <img
                onClick={() => removeProduct(item._id)}
                className="w-5 h-5 cursor-pointer"
                src={assets.close_logo}
                alt="delete"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
