import React from "react";
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

const WishList = () => {
  const wishlist = Product.slice(0, 5);

  return (
    <div className="w-full px-4 md:px-10 py-5">
      <h1 className="text-3xl font-semibold text-gray-900">Wish List</h1>
      <div className="px-20">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#f7f7f7" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>Product</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Price
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "20px" }}>
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
                  <TableCell align="left" sx={{fontSize: "16px"}}>Rs. {product.price}</TableCell>
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
  );
};

export default WishList;
