import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import AddressForm from "../components/AddressForm";

const Checkout = ({ openCheckout, handleClose }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-5 p-10">
        <div className="col-span-2 p-6 bg-white text-black rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">BILLING DETAILS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Country *"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="House number and street name *"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Town / City *"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="State / County *"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Postcode / ZIP *"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
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

          <div className="flex justify-between text-gray-700 mb-2">
            <span>
              Black solid casual s... <strong>× 1</strong>
            </span>
            <span>₹459.00</span>
          </div>

          <div className="border-t border-gray-300 my-2"></div>

          <div className="flex justify-between font-semibold text-gray-700 mb-4">
            <span>Subtotal</span>
            <span>₹459.00</span>
          </div>

          <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
