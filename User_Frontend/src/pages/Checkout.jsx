import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddress } from "../redux/addressSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { makeOrder } from "../services/orderServices";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.item);
  const userData = useSelector((state) => state.auth.userData);
  const address = useSelector((state) => state.address.address);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
  });
  const [errors, setErrors] = useState({});

  // console.log("Address", address);

  useEffect(() => {
    if (address) {
      setForm({
        fullName: address.fullName,
        email: address.email,
        phoneNumber: address.phoneNumber,
        country: address.country,
        street: address.street,
        apartment: address.apartment,
        city: address.city,
        state: address.state,
        postcode: address.postcode,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.street) newErrors.street = "Street is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.postcode) newErrors.postcode = "Postcode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with form submission

      const orders = cart.map((item) => {
        return {
          productId: item.details._id,
          quantity: item.quantity,
        };
      });
      console.log("Form submitted", {
        user: userData?._id,
        address: form,
        orders,
        totalPrice: totalPrice.toFixed(2),
      });
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

  const saveAddress = async () => {
    console.log("Address saved", { ...form, user: userData?._id });
    dispatch(addAddress({ ...form, user: userData?._id }));
  };

  useEffect(() => {
    if (userData) {
      dispatch(fetchAddress({ userId: userData?._id }));
    }
  }, [userData, dispatch]);

  // handlePayment Function
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/payment/order`,
        {
          amount: Number(totalPrice.toFixed(0)),
        }
      );

      const data = res.data;
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Raj_Store",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
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
          console.log(verifyData);

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
      })),
      address: form,
      payment: {
        orderId: order_id,
        paymentId: payment_id,
        signature: signature,
      },
      totalPrice: totalPrice.toFixed(2),
    });

    if (order.success) {
      toast.success("Order placed successfully");
      console.log({ order });
    }
    
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form className="grid grid-cols-3 gap-5 p-10" onSubmit={handleSubmit}>
        <div className="col-span-2 p-6 bg-white text-black rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">BILLING DETAILS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={form.fullName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName}</p>
              )}
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number *"
                value={form.phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="">
              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={form.country}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
              />
              {errors.country && (
                <p className="text-red-500">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="street"
              placeholder="House number and street name *"
              value={form.street}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.street && <p className="text-red-500">{errors.street}</p>}
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, unit, etc. (optional)"
              value={form.apartment}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="city"
              placeholder="Town / City *"
              value={form.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="state"
              placeholder="State / County *"
              value={form.state}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.state && <p className="text-red-500">{errors.state}</p>}
          </div>

          <div className="mt-4">
            <input
              type="text"
              name="postcode"
              placeholder="Postcode / ZIP *"
              value={form.postcode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.postcode && (
              <p className="text-red-500">{errors.postcode}</p>
            )}
          </div>

          <div className=" flex justify-end my-4">
            <button
              type="button"
              onClick={saveAddress}
              className="text-lg px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white cursor-pointer font-semibold"
            >
              Save Address
            </button>
          </div>
        </div>

        <div className="col-span-1 rounded-lg p-6 w-80 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">YOUR ORDER</h2>

          <div className="border-t border-gray-300 mb-2"></div>

          <div className="flex justify-between font-semibold text-gray-600 mb-2">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          <div className="border-t border-gray-300 mb-2"></div>

          <div className="flex flex-col justify-between text-gray-700 mb-2">
            {cart.map((item, index) => (
              <div className=" flex justify-between gap-4" key={index}>
                <div className="w-full flex items-center justify-between gap-2">
                  <h2 className="line-clamp-1">{item.details.title} </h2>{" "}
                  <strong className="whitespace-nowrap">
                    × {item.quantity}
                  </strong>
                </div>
                <span>
                  ₹
                  {(
                    (Number(item.details?.price) -
                      (Number(item.details?.price) *
                        Number(item.details?.discount)) /
                        100) *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 my-2"></div>

          <div className="flex justify-between font-semibold text-gray-700 mb-4">
            <span>Subtotal</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button
            // type="submit"
            type="button"
            onClick={handlePayment}
            // onClick={()=>handleOrder({
            //   order_id: "sjioerunwur8489n8v",
            //   payment_id: "iuerituirwpeurt894",
            //   signature: "ejmijn8439",
            // })}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
