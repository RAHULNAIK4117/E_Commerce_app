import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  // Fetch all orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/getAllOrders`);
        // console.log("All orders", response.data);

        setOrders(response.data.data)
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">All Orders</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">User ID</th>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Order Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length && orders.map((order, index) => (
            <tr key={index} className="border-t">
              <td className="p-3">{order.user}</td>
              <td className="p-3">{order._id}</td>
              <td className="p-3">Rs. {order.totalPrice}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Shipped"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3">
                <button
                  onClick={() => navigate(`/admin/order/${order._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default OrderList;