import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { AddProductThunk } from '../services/Actions/ProductAction';

const ProductForm = () => {

  const { isSuccess } = useSelector((state) => state.ProductReducer);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddProductThunk(product));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/AllProducts');
    }
  }, [isSuccess]);

  return (
    <>
      <div className="max-w-lg mx-auto p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Product</h2>
        <form action={"/api/products"} method='post'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product name" required />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product price" required />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" accept="image/*" />
          </div>

          <div className="mb-4 flex justify-center items-center">
            <Link to={"#"} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleSubmit}>Submit</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;