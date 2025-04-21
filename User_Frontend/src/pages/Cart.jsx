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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "../services/cartServices.js";
import { setItem } from "../redux/cartSlice.js";
import toast from "react-hot-toast";

const Cart = () => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const cart = useSelector((state) => state.cart.item);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
    return acc + Number(item.details?.price) * item.quantity;
  }, 0);

  const handleCart = () => {
    if(cart.length){
      navigate('/check-out')
    } else {
      return toast.error("Your cart is empty, Please add products to cart.")
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full px-4 md:px-10 py-5  gap-4">
      <div className="">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Your Cart
        </h1>
        <div className="px-2">
          {cart.length ? (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#f7f7f7" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                      Product
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Size
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      Remove
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="flex items-center">
                          <img
                            src={
                              product?.details?.images?.length
                                ? product?.details?.images[0]
                                : product?.details?.image
                            }
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
                      <TableCell
                        align="center"
                        sx={{ fontSize: "14px md:16px" }}
                      >
                        {product.size || "N/A"}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "14px md:16px" }}
                      >
                         Rs. {product.details?.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "14px md:16px" }}
                      >
                        <div className="flex justify-center items-center">
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
                      <TableCell align="center">
                        <button
                          onClick={() =>
                            deleteProductFromCart(product.productId)
                          }
                          style={{ color: "#f44336", cursor: "pointer" }}
                        >
                          <AiOutlineDelete size={26} />{" "}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p className="text-lg font-bold text-gray-700/60">
                Your cart is empty
              </p>
              <Link
                to={"/products"}
                className="opacity-75 text-gray-600 hover:opacity-100 hover:text-green-600 hover:font-semibold"
              >
                Go to Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className=" rounded-lg p-4 md:p-6 bg-white">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-green-600 font-semibold">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Estimate for</span>
              <span className="font-semibold">India</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-500 font-semibold">Total</span>
              <span className="text-green-600 font-semibold">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full items-center justify-end">
              <button
              onClick={handleCart}
              type="button"
                className=" bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 px-4 transition w-fit cursor-pointer"
              >
                Proceed To CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
