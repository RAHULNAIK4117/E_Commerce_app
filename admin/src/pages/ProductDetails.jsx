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
          className="text-blue-500 hover:text-blue-700 cursor-pointer border-[1px] rounded-md px-4 py-2 font-semibold "
        >
          Update Product
        </Link>
      </div>

      {/* Images */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h3 className="text-xl font-bold">Product Images</h3>
        <div className="flex items-center gap-2">
          {product &&
            product?.images &&
            product?.images.map((image, index) => (
              <img
                src={image}
                alt={product?.title}
                className="w-[150px] h-[150px] object-cover rounded-md "
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
                {Object.entries(product).map(
                  ([key, value]) =>
                    (key !== "image" && key !== "images") ? (
                      <tr key={key} className=" border-y">
                        <td className="py-2 px-4 capitalize font-semibold">
                          {key == '_id' ? 'ID' : key}
                        </td>
                        <td className="py-2 px-4 ">
                          {Array.isArray(value)
                            ? value.map(v => v).join(' ')
                            : typeof value === "string"
                            ? value.split(',').map(v => v).join(' ')
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
    </div>
  );
};

export default ProductDetails;
