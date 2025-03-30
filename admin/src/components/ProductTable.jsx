import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const AdminProductTable = ({ products, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Brand</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Rating</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">
                <img
                  src={product.images[0] || product.image}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{product.brand}</td>
              <td className="py-2 px-4 font-semibold text-green-600">Rs. {product.price}</td>
              <td className="py-2 px-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-500 text-sm ${
                      index < product.rating ? "fill-current" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </td>
              <td className="py-2 px-4 flex justify-center items-center h-full gap-3">
                <Link to={`/admin/product/${product._id}`} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <FaEye size={20} />
                </Link>
                <Link to={`/admin/edit-product/${product._id}`} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <FaEdit size={20} />
                </Link>
                <button
                  onClick={() => onDelete(product._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductTable;
