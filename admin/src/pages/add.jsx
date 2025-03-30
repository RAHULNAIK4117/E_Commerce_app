import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { backendURL } from "../App";
import ProductForm from "../components/ProductForm";

const Add = ({ token }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <ProductForm formTitle={"Add Product"} />
    </div>
  );
};

export default Add;
