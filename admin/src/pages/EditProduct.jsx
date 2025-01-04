import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ token }) => {
  const { productId } = useParams(); // Get productId from URL parameters
  const navigate = useNavigate();

  // States to hold form data
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch the product data when the component is mounted
  const fetchProduct = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/product/single", {
        productId,
      });
      console.log(response.data); // Debugging line
      if (response.data.success) {
        const product = response.data.product;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setBestseller(product.bestSeller);
        setImage1(product.image[0] || null);
        setImage2(product.image[1] || null);
        setImage3(product.image[2] || null);
        setImage4(product.image[3] || null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the form is submitted

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("bestSeller", bestseller ? "true" : "false");

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Send the update request
      const response = await axios.post(
        backendUrl + "/api/product/update/:productId",
        formData,
        {
          headers: { token },
          params: { productId }, // Pass productId as a URL parameter for the backend to know which product to update
        }
      );

      // Handle response
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/product/list"); // Redirect back to the product list after updating
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={
                image1
                  ? image1 instanceof File
                    ? URL.createObjectURL(image1)
                    : image1
                  : assets.upload_area
              }
              alt="Image 1"
            />

            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={
                image2
                  ? image1 instanceof File
                    ? URL.createObjectURL(image2)
                    : image2
                  : assets.upload_area
              }
              alt="Image 1"
            />

            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={
                image3
                  ? image3 instanceof File
                    ? URL.createObjectURL(image3)
                    : image3
                  : assets.upload_area
              }
              alt="Image 1"
            />

            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={
                image4
                  ? image4 instanceof File
                    ? URL.createObjectURL(image4)
                    : image4
                  : assets.upload_area
              }
              alt="Image 1"
            />

            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            id="price"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="20"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            className="w-5 h-5"
            type="checkbox"
            id="bestseller"
          />
          <label
            className="cursor-pointer text-sm text-gray-700"
            htmlFor="bestseller"
          >
            Add to Bestseller
          </label>
        </div>
      </div>

      <button
        onClick={() => navigate('/list')}
        type="submit"
        className="w-[500px] py-2 mt-4 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          "UPDATE"
        )}
      </button>
    </form>
  );
};

export default EditProduct;
