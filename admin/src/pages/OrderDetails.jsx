import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiPackage, FiHome, FiCreditCard, FiRefreshCw } from "react-icons/fi";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(true);

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/get-order/${orderId}`
      );
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/update/${orderId}`,
        {
          orderStatus: order.status,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsModified(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    if (orderId) {
      getOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Details</h1>
      
      {/* Order Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Order #{order._id?.slice(-8)}</h2>
            <p className="text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Status:</span>
              <select
                name="status"
                value={order.status}
                onChange={(e) => {
                  const updatedStatus = e.target.value;
                  setOrder((prevOrder) => ({
                    ...prevOrder,
                    status: updatedStatus,
                  }));
                  setIsModified(true);
                }}
                className={`p-2 border rounded-md cursor-pointer ${
                  statusColors[order.status] || "bg-gray-100"
                } font-medium`}
              >
                {[
                  "Pending",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                ].map((status) => (
                  <option key={status} value={status} className="bg-white">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={!isModified}
              type="button"
              onClick={updateStatus}
              className={`mt-2 px-4 py-2 rounded-md cursor-pointer text-white font-semibold flex items-center ${
                isModified
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } transition-colors`}
            >
              <FiRefreshCw className="mr-2" />
              Update Status
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Customer</h3>
            <p className="text-gray-900">{order.address?.fullName}</p>
            <p className="text-gray-600">{order.user}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Contact</h3>
            <p className="text-gray-900">{order.address?.email}</p>
            <p className="text-gray-600">{order.address?.phoneNumber}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Order Total</h3>
            <p className="text-2xl font-bold text-gray-900">
              ₹{order.totalPrice?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <FiPackage className="text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order?.orders?.map((prod, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16">
                        <img
                          className="h-16 w-16 rounded object-cover"
                          src={prod?.product?.images?.[0]}
                          alt="Product"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {prod.product?.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {prod.product?.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prod.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prod.size || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <FiHome className="text-green-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Shipping Address
          </h2>
        </div>
        {order?.address && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="text-gray-900">{order.address.fullName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="text-gray-900">{order.address.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="text-gray-900">{order.address.phoneNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Street</h3>
              <p className="text-gray-900">{order.address.street}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Apartment</h3>
              <p className="text-gray-900">{order.address.apartment}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">City</h3>
              <p className="text-gray-900">{order.address.city}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">State</h3>
              <p className="text-gray-900">{order.address.state}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Postcode</h3>
              <p className="text-gray-900">{order.address.postcode}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Country</h3>
              <p className="text-gray-900">{order.address.country}</p>
            </div>
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FiCreditCard className="text-purple-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Payment Information
          </h2>
        </div>
        {order?.payment && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Amount</h3>
              <p className="text-2xl font-bold text-gray-900">
                ₹{order.totalPrice?.toFixed(2)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment ID</h3>
              <p className="text-gray-900">{order.payment.paymentId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
              <p className="text-gray-900">{order.payment.orderId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Signature</h3>
              <p className="text-gray-900">{order.payment.signature}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;