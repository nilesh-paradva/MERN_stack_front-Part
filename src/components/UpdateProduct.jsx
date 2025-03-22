import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';
import { GetSingleProductThunk, UpdateProductThunk } from '../services/Actions/ProductAction';

const Updateproduct = () => {
  const { isSuccess, product, isLoading } = useSelector((state) => state.ProductReducer);
  const [products, setProducts] = useState({
    name: '',
    price: '',
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProducts((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateProductThunk(id,products));
  };

  useEffect(() => {
    if(id){
      dispatch(GetSingleProductThunk(id));
    }
  }, [id]);

  useEffect(() => {
    if(product){
        setProducts(product.data);
    }
  }, [product]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/AllProducts');
    }
  }, [isSuccess]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="update-product flex items-center justify-center h-[100vh]">
      <div className="max-w-lg mx-auto p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Update Product</h2>
        <form action={`/api/products/${id}`} method='post'>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="name" name="name" value={products?.name || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product name" required />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" name="price" value={products?.price || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product price" required />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" accept="image/*" />
          </div>

          <div className="mb-4 flex justify-center items-center">
            <Link to={"#"} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 !no-underline" onClick={handleSubmit}>
            {isLoading ?
              <div className="loading-spiner" >
                <span className="spinner-border spinner-border-sm"></span>
                <span role="status" className='ms-1 inline-block'>Loading...</span>
              </div> : 'Update Product'}
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Updateproduct;