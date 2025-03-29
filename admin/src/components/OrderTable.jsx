import React from "react";

const OrderTable = ({ orders, onUpdateOrder }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Order Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border-t">
              <td className="p-3">
                <img src={order.image} alt="product" className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="p-3">{order.orderId}</td>
              <td className="p-3">Rs {order.price}</td>
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
                  onClick={() => onUpdateOrder(order.orderId)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Update Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
