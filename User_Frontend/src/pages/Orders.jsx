import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../services/orderServices";
import { Link } from "react-router-dom";

const Orders = () => {
  const userDate = useSelector((state) => state.auth.userData);
  const [orders, setOrders] = React.useState([]);

  const fetchOrders = async () => {
    const response = await getOrders(userDate?._id);
    if (response.success) {
      // console.log(response);
      setOrders(response.data);
    }
  };

  useEffect(() => {
    if (userDate) {
      fetchOrders();
    }
  }, [userDate]);

  return (
    <div className="w-full px-4 md:px-10 py-5">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div className="flex flex-col gap-4 justify-between mb-4">
        {orders.length ? (
          <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 text-center py-3 border-b">Order ID</th>
                <th className="px-4 text-center py-3 border-b">
                  Order Products
                </th>
                <th className="px-4 text-center py-3 border-b">Order Date</th>
                <th className="px-4 text-center py-3 border-b">Order Status</th>
                <th className="px-4 text-center py-3 border-b">Order Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b even:bg-gray-100 hover:bg-gray-200 transition-all "
                >
                  <td className="px-4 text-center py-3 text-gray-900 font-semibold">
                    {order._id}
                  </td>
                  <td className="px-4 text-center py-3">
                    <div className="flex flex-col space-y-2">
                      {order.orders.map((product, index) => (
                        <Link to={`/product/${product.product}`} key={index} className="text-gray-700 hover:text-blue-400">
                          {product.product}
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 text-center py-3 text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-4 text-center py-3 font-semibold ${
                      order.status === "Pending"
                        ? "text-orange-500"
                        : order.status === "Processing"
                        ? "text-yellow-600"
                        : order.status === "Shipped"
                        ? "text-blue-500"
                        : order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 text-center py-3 font-semibold text-gray-900">
                    Rs. {order.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
