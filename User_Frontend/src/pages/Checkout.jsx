import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddress } from "../redux/addressSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { makeOrder } from "../services/orderServices";
import { AddressForm } from "../components";
import { clearCart } from "../services/cartServices";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.item);
  const userData = useSelector((state) => state.auth.userData);
  const address = useSelector((state) => state.address.address);

  const dispatch = useDispatch();
  const validate = () => {
    if (
      !address.fullName ||
      !address.phoneNumber ||
      !address.country ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postcode
    ) {
      return false;
    } else {
      return true;
    }
  };

  const totalPrice = cart?.reduce((acc, item) => {
    return (
      acc +
      (Number(item.details?.price) -
        (Number(item.details?.price) * Number(item.details?.discount)) / 100) *
        item.quantity
    );
  }, 0);

  // handlePayment Function
  const handlePayment = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/payment/order`,
          {
            amount: Number(totalPrice.toFixed(0)),
          }
        );

        const data = res.data;
        // console.log(data);
        handlePaymentVerify(data.data);
      } catch (error) {
        console.log(error);
      }
      
    } else {
      toast.error("Billing Details Required!")
      
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "rahul_store",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        // console.log("response", response);
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          const verifyData = res.data;
          // console.log(verifyData);

          if (verifyData.message) {
            handleOrder({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleOrder = async ({ order_id, payment_id, signature }) => {
    const order = await makeOrder({
      user: userData?._id,
      orders: cart.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
        size: item.size,
      })),
      address,
      payment: {
        orderId: order_id,
        paymentId: payment_id,
        signature: signature,
      },
      totalPrice: totalPrice.toFixed(2),
    });

    if (order.success) {
      toast.success("Order placed successfully");
      // clear cart 
      await clearCart(userData?._id)
      dispatch(addToCart({ userId: userData?._id }));

      // console.log({ order });
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
      <AddressForm />

      <form className="h-full" onSubmit={handlePayment}>
        <div className="col-span-1 flex flex-col justify-between rounded-lg p-6 h-full bg-white shadow-md">
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">YOUR ORDER</h2>

            {cart.length ? <table className="w-full border-gray-300  overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 border-b text-left">Product</th>
                  <th className="px-4 py-3 border-b text-center">Quantity</th>
                  <th className="px-4 py-3 border-b text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b even:bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <td className="px-4 py-3 text-gray-900">
                      {item.details.title}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      ₹
                      {(
                        (Number(item.details?.price) -
                          (Number(item.details?.price) *
                            Number(item.details?.discount)) /
                            100) *
                        item.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-gray-700/60">Your cart is empty</p>
                <Link to={"/products"} className="opacity-75 text-gray-600 hover:opacity-100 hover:text-green-600 hover:font-semibold" >Go to Shopping</Link>
              </div>
            )}
          </div>

          <div className="">
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold text-gray-700 mb-4">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-end w-full">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
