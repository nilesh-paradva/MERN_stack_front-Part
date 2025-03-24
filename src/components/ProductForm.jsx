import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddProductThunk } from '../services/Actions/ProductAction';

const ProductForm = () => {
  const { isSuccess, isLoading } = useSelector((state) => state.ProductReducer);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    imagePath: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('imagePath', product.imagePath);  

    if(!product.imagePath){
      return alert("Product Image is Required");
    }

    dispatch(AddProductThunk(formData)); 
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/AllProducts');
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <div className="showAllProduct">
        <Link to={"/AllProducts"} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 !no-underline" >
          Show All Products
        </Link>
      </div>
      <div className="max-w-lg mx-auto p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product name" />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product price"/>
          </div>

          <div className="mb-4">
            <label htmlFor="imagePath" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" id="imagePath" name="imagePath" onChange={(e) => setProduct({ ...product, imagePath: e.target.files[0] })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" accept="image/*"/>
          </div>

          <div className="mb-4 flex justify-center items-center">
            <button type="submit" className="px-3 py-2 bg-blue-500 text-white !rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 !no-underline disabled={isLoading}">
              {isLoading ? (
                <div className="loading-spinner">
                  <span className="spinner-border spinner-border-sm"></span>
                  <span role="status" className='ms-1'>Loading...</span>
                </div>
              ) : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;