import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../App";
import ProductCard from "../components/ProductCard";
import AdminProductTable from "../components/ProductTable";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [total, setTotal] = useState(null);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/get`,
        {
          params: {
            page,
            limit: 20,
          },
        }
      );
      // console.log("Products:", response.data);

      setProducts(response.data.data);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page]);

  const handleDelete = async (productId) => {
    // console.log({ productId });
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/delete/${productId}`
      );
      if (response.data.success) {
        // console.log("delete response", response.data);
        toast.success(response.data.message)
        setProducts(products.filter(p => p._id !== productId))
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        All Products
      </h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div> */}

      <AdminProductTable products={products} onDelete={handleDelete} />
      <div className="w-full max-w-[400px] mx-auto mt-10 flex justify-between items-center gap-5">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`border-black px-2 py-1 rounded-lg cursor-pointer font-semibold border-[1px] ${
            page === 1 ? "opacity-50" : ""
          }`}
        >
          Prev
        </button>
        <span className="font-semibold">
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`border-black px-2 py-1 rounded-lg cursor-pointer font-semibold border-[1px]  ${
            page === totalPages ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
