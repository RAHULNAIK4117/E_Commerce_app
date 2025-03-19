import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Product from "../assets/Products.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa";
import Checkout from "./Checkout.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const wishlist = Product.slice(0, 5);
  const [quantity, setQuantity] = useState(1);
  const [openCheckout, setOpenCheckout] = useState(false)

  const changeQuantity = (value) => {
    if (quantity === 1 && value === -1) return;
    setQuantity(quantity + value);
  };

  const handleClose = () => {
    setOpenCheckout(false);
  };
  const handleOpen = () => {
    setOpenCheckout(true);
  };

  return (
    <div className="w-full px-4 md:px-10 py-5 grid grid-cols-3">
      <div className="col-span-2">
        <h1 className="text-3xl font-semibold text-gray-900">Your Cart</h1>
        <div className="px-20">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#f7f7f7" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                    Product
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlist.map((product) => (
                  <TableRow
                    key={product.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            marginRight: 16,
                          }}
                        />
                        <span className="text-lg ">{product.title}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "16px" }}>
                      Rs. {product.price}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "16px" }}>
                      <div className="flex items-center">
                        <button
                          onClick={() => changeQuantity(-1)}
                          className="h-8 w-8 rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-xl w-14 flex items-center justify-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => changeQuantity(1)}
                          className="h-8 w-8 rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <button style={{ color: "#f44336", cursor: "pointer" }}>
                        <AiOutlineDelete size={24} />{" "}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-green-600 font-semibold">₹459.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Estimate for</span>
              <span className="font-semibold">United Kingdom</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Total</span>
              <span className="text-green-600 font-semibold">₹459.00</span>
            </div>
            <Link to={"/check-out"} className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 px-4 transition">
              Proceed To CheckOut
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
