import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Products from "../assets/Products";
import { ProductCard } from "../components";
import { Breadcrumbs, Typography } from "@mui/material";

const Product = () => {
  const [searchParams] = useSearchParams();
  const [productNumber, setProductNumber] = useState(12);
  const [showProducts, setShowProducts] = useState([]);
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const search = searchParams.get("search");
  // console.log(Products);

  // let showProducts = []

  useEffect(() => {
    // console.log({ category, subCategory });

    const showProducts = search ? Products?.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    ).slice(0, productNumber) : category
      ? Products?.filter(
          (prod) => prod?.category?.toLowerCase() === category?.toLowerCase()
        ).slice(0, productNumber)
      : Products.slice(0, 20);
    

    setShowProducts(showProducts);

    window.scrollTo({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, [category, subCategory, search]);

  return (
    <div className="w-full px-4 md:px-10 py-5">
      <div className="bg-green-200 h-28 rounded-xl w-full mb-5 flex flex-col justify-center gap-2 px-10">
        <h2 className="text-3xl capitalize font-semibold">
          {category ? category : "All Products"}
        </h2>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">
            <Link to="/">Home</Link>
          </Typography>
          <Typography color="inherit">
            <Link to="/products">Products</Link>
          </Typography>
          {category && (
            <Typography color="inherit">
              <Link
                to={`/products?category=${category}`}
                className="capitalize"
              >
                {category}
              </Link>
            </Typography>
          )}
          {subCategory && (
            <Typography color="inherit">
              <Link
                to={`/products?category=${category}&subCategory=${subCategory}`}
                className="capitalize"
              >
                {subCategory}
              </Link>
            </Typography>
          )}
          {search && (
            <Typography color="inherit">
              {search}
            </Typography>
          )}
        </Breadcrumbs>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="bg-red-400 w-full lg:w-[270px] hidden lg:block flex-shrink-0"></div>
        <div className="w-full">
          <div className="py-4 font-semibold text-gray-600">
            We found{" "}
            <span className="text-[#00A63E] text-lg ">
              {showProducts.length}
            </span>{" "}
            items for you!
          </div>
          <div className=" w-full min-h-[500px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {showProducts.length ? (
              showProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="w-full flex col-span-full justify-center items-center h-full">
                <h2 className="text-gray-600 text-xl">
                  No Products found for your search!
                </h2>
              </div>
            )}
          </div>
          {/* {showProducts.length >= productNumber && (
            <div className="p-2 mt-5 flex justify-end">
              <p>Show More Products</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Product;
