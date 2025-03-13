import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Products from "../assets/Products";
import { Breadcrumbs, Rating, Typography } from "@mui/material";
import { PageLoader, ProductImageGallery } from "../components";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [zoomImage, setZoomImage] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const getThisProduct = async () => {
    setLoading(true);
    console.log(id);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const product = Products.find((pro) => pro.id === Number(id));
    console.log(product);
    setProduct(product);
    setLoading(false);
  };

  useEffect(() => {
    getThisProduct();
    window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      });
  }, [id]);

  const changeQuantity = (value) => {
    if (quantity == 1 && value == -1) return;
    setQuantity(quantity + value);
  };

  return (
    <div>
      <div className="shadow-sm h-14 px-4 md:px-10 flex items-center ">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">
            <Link to="/" className="hover:text-[#00A63E]">
              Home
            </Link>
          </Typography>
          <Typography color="inherit">
            <Link to="/products" className="hover:text-[#00A63E]">
              Products
            </Link>
          </Typography>
          <Typography color="inherit">
            <Link to={`/product/${product?.id}`} className="text-[#00A63E]">
              {product?.title}
            </Link>
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="w-full px-4 md:px-10 py-5">
        {loading ? (
          <div className="">
            <PageLoader />
          </div>
        ) : (
          <div className="">
            <div className="w-full flex flex-col md:flex-row gap-10 justify-between mb-4 ">
              {/* Image section */}
              <div className="flex-1 flex-shrink-1 w-full max-w-[600px] h-[600px] ">
                <ProductImageGallery />
              </div>
              {/* Details section */}
              <div className="flex-1 space-y-3 w-full ">
                {/* title */}
                <h2 className="text-2xl font-semibold"> {product?.title}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <h3 className="text-xl">{product?.rating} </h3>
                  <Rating
                    name="read-only"
                    value={product?.rating}
                    precision={0.1}
                    readOnly
                  />
                  <span className="text-xl">
                    ({product?.reviews.length} Reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold text-[#00A63E] ">
                    Rs.
                    {(
                      Number(product?.price) -
                      (Number(product?.price) * Number(product?.discount)) / 100
                    ).toFixed(2)}
                  </h3>
                  <div className="">
                    <span className="text-2xl text-[#FAAF00] font-bold  ">
                      {product?.discount}%
                    </span>
                    <h3 className=" line-through">Rs.{product?.price}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg leading-tight">{product?.description} </p>

                {/* Sizes */}
                <div className="flex flex-wrap gap-2 mt-6">
                <h2 className="text-xl font-semibold">Size:</h2>
                  {product?.size?.map((size, index) => (
                    <div className="">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        id={size}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={size}
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded-md peer-checked:bg-[#00A63E] peer-checked:text-white "
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">Quantity:</h2>
                  <div className="flex items-center">
                    <button
                      onClick={() => changeQuantity(-1)}
                      className="h-8 w-8 rounded-md flex items-center justify-center bg-gray-200"
                    >
                      <FaMinus />
                    </button>
                    <span
                      className="text-2xl w-14 font-semibold text-[#00A63E] flex items-center justify-center
                    "
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => changeQuantity(1)}
                      className="h-8 w-8 rounded-md flex items-center justify-center bg-gray-200"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-screen w-full bg-blue-200"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
