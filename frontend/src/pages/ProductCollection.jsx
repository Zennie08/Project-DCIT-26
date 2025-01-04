import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const ProductCollection = () => {
  const { products, search, showSearch } = useContext(ShopContext); 
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const applyFilter = () => {
    let filteredProducts = [...products]; 
  
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    setFilterProducts(filteredProducts); 
  };
  
  useEffect(() => {
    applyFilter(); 
  }, [search, showSearch, products]);

  const applyFilterAndSort = () => {
    let filteredProducts = [...products]; 

    // Apply sorting
    switch (sortType) {
      case 'low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break; 
    }

    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [sortType, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="PRODUCTS" />

          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
            value={sortType}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products or Show "No items" */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p className="col-span-2 md:col-span-3 lg:col-span-4 text-center text-gray-500 h-[385px]">
              No items found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
