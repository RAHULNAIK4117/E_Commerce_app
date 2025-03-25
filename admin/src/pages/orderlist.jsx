import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/orders`);
        setOrders(response.data);
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
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
            {/* Order ID and Status */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Name:</span> {order.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Phone:</span> {order.customerPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address:</span> {order.shippingAddress.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">City:</span> {order.shippingAddress.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">State:</span> {order.shippingAddress.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Products Ordered */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Products Ordered</h3>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center border-b pb-4 last:border-b-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Total Amount: ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;