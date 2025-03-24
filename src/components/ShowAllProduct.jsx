import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProductThunk, GetProductThunk } from '../services/Actions/ProductAction';
import { Link } from 'react-router';
import ProductImage from "../assets/images/product-d.jpg"

const ShowAllProduct = () => {

  const { products, isLoading } = useSelector((state) => state.ProductReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProductThunk());
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Show All Products</h1>
      <div className="Home-link mb-5">
        <Link to={'/'} className='!bg-blue-500 hover:!bg-blue-700 text-white font-bold py-2 px-4 rounded-lg !no-underline'>Home</Link>
      </div>
      {isLoading ? (
        <div className="div flex items-center justify-center h-[80vh]">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) :
        products.data && products.data.length > 0 ? (
          <div className="container">
            <div className="row"> 
              {products.data.map((product) => (
                <div className="col-lg-4 col-md-6" key={product._id}>
                  <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="product-image p-2">
                      <img className="w-full h-48 object-cover rounded-lg" src={(product.imagePath) ? `http://localhost:5000/ProductImgUpload/${product.imagePath}` : (ProductImage)} alt={product.name} />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                      <p className="text-lg text-green-500 mt-2">${product.price}</p>
                    </div>
                    <div className="Action-button flex items-center justify-between gap-x-1">
                      <Link to={`/Updateproduct/${product._id}`} className='!bg-blue-500 hover:!bg-blue-700 text-white font-bold py-2 px-4 rounded !no-underline'>Update</Link>
                      <Link to={"#"} className='!bg-red-500 hover:!bg-red-700 text-white font-bold py-2 px-4 rounded !no-underline' onClick={() => dispatch(DeleteProductThunk(product._id))}>Delete&nbsp;Product</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="div flex items-center justify-center h-[80vh]">
            <p className='text-2xl font-bold'>No products available</p>
          </div>
        )}
    </div>
  );
}

export default ShowAllProduct;