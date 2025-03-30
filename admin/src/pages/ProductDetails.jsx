import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  //   console.log({ productId });
  const [product, setProduct] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/get/${productId}`
      );
      //   console.log({ product: response.data.data });
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Product Details</h2>
        <Link
          to={`/admin/edit-product/${product?._id}`}
          className="text-blue-500 hover:text-blue-700 cursor-pointer border border-gray-300 rounded-md px-4 py-2 font-semibold"
        >
          Update Product
        </Link>
      </div>

      {/* Images */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h3 className="text-xl font-bold">Product Images</h3>
        <div className="flex items-center gap-2">
          {product?.images?.map((image, index) => (
            <img
              src={image}
              alt={product?.title}
              className="w-36 h-36 object-cover rounded-md"
              key={index}
            />
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        {product && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <tbody>
                {Object.entries(product).map(([key, value]) =>
                  key !== "image" && key !== "images" && key !== "reviews" ? (
                    <tr key={key} className="border-y">
                      <td className="py-2 px-4 capitalize font-semibold">
                        {key === "_id" ? "ID" : key}
                      </td>
                      <td className="py-2 px-4">
                        {Array.isArray(value)
                          ? value.join(" ")
                          : typeof value === "string"
                          ? value.split(",").join(" ")
                          : value}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Product Reviews</h2>
       <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
       {product?.reviews?.length ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              className="flex items-center p-4 border border-gray-200 rounded-md space-x-4"
            >
              {/* User Avatar */}
              <img
                src="https://th.bing.com/th/id/OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw?rs=1&pid=ImgDetMain"
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />

              {/* Review Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {review?.createdAt.split("T")[0]}
                </p>
                <p className="mt-1">{review?.comment}</p>
                <p className="mt-1 text-green-600 font-semibold">
                  {review?.username}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center">
                <span className="text-yellow-500 font-bold">
                  {review.rating} ★
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-2xl font-semibold">No reviews yet!</h2>
          </div>
        )}
       </div>
      </div>
    </div>
  );
};

export default ProductDetails;
