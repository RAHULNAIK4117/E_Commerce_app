import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/product/list`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Product Images */}
            <div className="relative h-48 overflow-hidden">
              {product.images.length > 0 && (
                <img
                  src={product.images[0]} // Display the first image
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>

              {/* Price and Discount */}
              <div className="flex items-center mb-2">
                <p className="text-lg font-semibold text-gray-800">
                  ${product.price.toFixed(2)}
                </p>
                {product.discount > 0 && (
                  <p className="text-sm text-gray-500 line-through ml-2">
                    ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Stock */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>

              {/* Brand */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>

              {/* Category and Subcategory */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Subcategory:</span> {product.subcategory}
              </p>

              {/* Sizes */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Sizes:</span> {product.sizes.join(", ")}
              </p>

              {/* Colors */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Colors:</span> {product.colors.join(", ")}
              </p>

              {/* Warranty */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Warranty:</span> {product.warranty}
              </p>

              {/* Return Policy */}
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Return Policy:</span> {product.returnPolicy}
              </p>

              {/* Bestseller Badge */}
              {product.bestseller && (
                <span className="inline-block bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Bestseller
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;