import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProductThunk, GetProductThunk } from '../services/Actions/ProductAction';
import { Link } from 'react-router';

const ShowAllProduct = () => {

  const { products } = useSelector((state) => state.ProductReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProductThunk());
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Show All Products</h1>
      <div className="Home-link">
        <Link to={'/'} className='!bg-blue-500 hover:!bg-blue-700 text-white font-bold py-2 px-4 rounded"'>Home</Link>
      </div>
      {products.data && products.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.data.map((product) => (
            <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden" key={product._id}>
              <div className="product-image p-2">
                <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-lg text-green-500 mt-2">${product.price}</p>
              </div>
              <div className="Action-button flex items-center justify-between gap-x-1">
                  <Link to={`/Updateproduct/${product._id}`} className='!bg-blue-500 hover:!bg-blue-700 text-white font-bold py-2 px-4 rounded"'>Update</Link>
                  <Link to={"#"} className='!bg-red-500 hover:!bg-red-700 text-white font-bold py-2 px-4 rounded"' onClick={() => dispatch(DeleteProductThunk(product._id))}>Delete&nbsp;Product</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ShowAllProduct;