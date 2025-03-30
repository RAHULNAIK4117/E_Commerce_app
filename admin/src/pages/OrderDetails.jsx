import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [isModified, setIsModified] = useState(false);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/get-order/${orderId}`
      );
      // console.log("response", response.data);
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
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
        // console.log("response", response.data);
        toast.success(response.data.message);
        setIsModified(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const changeStatus = () => {
      // console.log({ status: order.status });
    };

    changeStatus();
  }, [order]);

  //   const order = {
  //     address: {
  //       fullName: "Dolamani Rohidas",
  //       email: "dolamanirohidas696@gmail.com",
  //       phoneNumber: "8117994713",
  //       country: "India",
  //       street: "Konark Institute of Science and Technology, Bhubaneswar",
  //       apartment: "Hostel - H3",
  //       city: "bhubaneswar",
  //       state: "Odisha, India",
  //       postcode: "572050",
  //     },
  //     payment: {
  //       orderId: "sjioerunwur8489n8v",
  //       paymentId: "iuerituirwpeurt894",
  //       signature: "ejmijn8439",
  //     },
  //     status: "Pending",
  //     _id: "67e18325c4a9b2a751e34e0d",
  //     user: "67dfa7a31ee4569215487670",
  //     orders: [
  //       {
  //         product: "67dec21645f8a87471825a63",
  //         quantity: 1,
  //         _id: "67e18325c4a9b2a751e34e0e",
  //       },
  //     ],
  //     totalPrice: 8.5,
  //     createdAt: "2025-03-24T16:07:01.452Z",
  //     updatedAt: "2025-03-24T16:07:01.452Z",
  //     __v: 0,
  //   };

  useEffect(() => {
    if (orderId) {
      // console.log({ orderId });
      getOrderDetails();
    }
  }, [orderId]);
  return (
    <div className="w-full space-y-4">
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 ">Order ID</th>
              <th className="py-2 px-4 ">User ID</th>
              <th className="py-2 px-4 ">Order Status</th>
              <th className="py-2 px-4 ">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" border-b">
              <td className="py-2 px-4 ">{order._id} </td>
              <td className="py-2 px-4 ">{order.user}</td>
              <td className="py-2 px-4 ">
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
                  className="p-2 border-[1px] border-gray-300 outline-none rounded-md cursor-pointer "
                >
                  {[
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4">
                <button
                  disabled={!isModified}
                  type="button"
                  onClick={updateStatus}
                  className={`px-4 py-2 bg-blue-500 rounded-md text-white font-semibold cursor-pointer ${
                    isModified ? "opacity-100" : "opacity-60"
                  }`}
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Orders */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Orders</h2>
        {order && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 ">Order ID</th>
                  <th className="py-2 px-4 ">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order?.orders?.map((prod, index) => (
                  <tr key={index} className=" border-b">
                    <td className="py-2 px-4 ">{prod.product}</td>
                    <td className="py-2 px-4 ">{prod.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Address</h2>
        {order?.address && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <tbody>
                {Object.entries(order?.address).map(([key, value]) => (
                  <tr key={key} className=" border-y">
                    <td className="py-2 px-4 capitalize font-semibold">
                      {key}
                    </td>
                    <td className="py-2 px-4 ">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Details */}
      <div className="w-full text-left shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-semibold">Payment Details</h2>
        {order?.payment && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <tbody>
                <tr className="border-y">
                    <td className="py-2 px-4 capitalize font-semibold">
                        Amount:
                    </td>
                    <td className="py-2 px-4 ">
                        Rs. {order?.totalPrice}
                    </td>
                </tr>
                {Object.entries(order?.payment).map(([key, value]) => (
                  <tr key={key} className=" border-y">
                    <td className="py-2 px-4 capitalize font-semibold">
                      {key}
                    </td>
                    <td className="py-2 px-4 ">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
