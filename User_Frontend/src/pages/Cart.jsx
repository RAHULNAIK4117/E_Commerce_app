import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  updateCart,
} from "../services/cartServices.js";
import { setItem } from "../redux/cartSlice.js";

const Cart = () => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const cart = useSelector((state) => state.cart.item);
  const dispatch = useDispatch();

  const changeQuantity = async (id, quantity, value) => {
    // console.log({ id, quantity, value });

    const response = await updateCart({
      userId: userData?._id,
      productId: id,
      quantity: quantity + value,
    });

    if (response.success) {
      // console.log(response.data);
      dispatch(setItem(response.data[0].products));
    }
  };

  const handleClose = () => {
    setOpenCheckout(false);
  };
  const handleOpen = () => {
    setOpenCheckout(true);
  };

  const deleteProductFromCart = async (productId) => {
    // console.log({ productId });
    const response = await deleteCart({ userId: userData?._id, productId });
    if (response.success) {
      // console.log("delete response", response);
      dispatch(setItem(response.data[0].products));
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

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      });
    }, []);

  return (
    <div className="w-full px-4 md:px-10 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Your Cart</h1>
        <div className="px-2 md:px-20">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#f7f7f7" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px md:20px" }}>
                    Product
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontWeight: "bold", fontSize: "16px md:20px" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontWeight: "bold", fontSize: "16px md:20px" }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "16px md:20px" }}
                  >
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart?.map((product) => (
                  <TableRow
                    key={product.details?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className="flex items-center">
                        <img
                          src={product?.details?.images?.length ? product?.details?.images[0] : product?.details?.image}
                          alt={product.details?.title}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "cover",
                            marginRight: 8,
                          }}
                          className="md:w-24 md:h-24 md:mr-4 object-cover"
                        />
                        <span className="text-sm md:text-lg">
                          {product.details?.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "14px md:16px" }}>
                      Rs. {product.details?.price}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "14px md:16px" }}>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            changeQuantity(
                              product?.productId,
                              product?.quantity,
                              -1
                            )
                          }
                          className="h-6 w-6 md:h-8 md:w-8 rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                          <FaMinus />
                        </button>
                        <span className="text-sm md:text-xl w-8 md:w-14 flex items-center justify-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            changeQuantity(
                              product?.productId,
                              product.quantity,
                              1
                            )
                          }
                          className="h-6 w-6 md:h-8 md:w-8 rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => deleteProductFromCart(product.productId)}
                        style={{ color: "#f44336", cursor: "pointer" }}
                      >
                        <AiOutlineDelete size={20} className="md:size-24" />{" "}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="border rounded-lg p-4 md:p-6 bg-white shadow-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-green-600 font-semibold">₹{totalPrice.toFixed(2)}</span>
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
              <span className="text-green-600 font-semibold">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to={"/check-out"}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 px-4 transition"
            >
              Proceed To CheckOut
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
