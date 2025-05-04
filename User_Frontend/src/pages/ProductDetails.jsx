import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Products from "../assets/Products";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  PageLoader,
  ProductCard,
  ProductImageGallery,
  ReviewForm,
} from "../components";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaPlus,
  FaRegHeart,
} from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { getProductDetails, getProducts } from "../services/productsServices";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setrelatedProducts] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // console.log({ userData });

  // const relatedProducts = product
  //   ? Products.filter((prod) => prod.category === product.category).slice(0, 10)
  //   : null;

  const getThisProduct = async () => {
    setLoading(true);
    const product = await getProductDetails(id);
    // console.log({ product });
    setProduct(product?.data);

    const relProducts = await getProducts({
      category: product?.data?.category,
    });
    setrelatedProducts(relProducts.data);

    setLoading(false);
  };

  const addToCartProduct = async () => {
    if (product?.size?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
     dispatch(addToCart({ 
      userId: userData?._id, 
      productId: id, 
      quantity,
      size: selectedSize,
      details: product, 
    }));
    // const product = await addToCart({ userId: userData._id, productId: id, quantity });
    // console.log({product});
    // if (product?.success) {
    //   console.log("Product added to cart!");
    // }
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
    if (quantity === 1 && value === -1) return;
    setQuantity(quantity + value);
  };

  const handleReviewSubmit = (e, comment) => {
    e.preventDefault();
    // console.log("New Review:", comment);
  };

  return (
    <div>
      <div className="shadow-sm h-14 px-4 md:px-10 flex items-center">
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
          <div>
            <PageLoader />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4 ">
              {/* Image section */}
              <div className=" w-full max-w-[600px] h-[600px] mx-auto">
                <ProductImageGallery images={product?.images}/>
              </div>
              {/* Details section */}
              <div className="space-y-5 w-full ">
                {/* title */}
                <h2 className="text-2xl font-semibold">{product?.title}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <h3 className="text-xl">{product?.rating}</h3>
                  <Rating
                    name="read-only"
                    value={product?.rating}
                    precision={0.1}
                    readOnly
                  />
                  <span className="text-xl">
                    ({product?.reviews?.length} Reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold text-[#00A63E]">
                    Rs.
                    {(
                      Number(product?.price) -
                      (Number(product?.price) * Number(product?.discount)) / 100
                    ).toFixed(2)}
                  </h3>
                  <div>
                    <span className="text-2xl text-[#FAAF00] font-bold">
                      {product?.discount}%
                    </span>
                    <h3 className="line-through">Rs.{product?.price}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg leading-tight text-gray-600">
                  {product?.description}
                </p>

                {/* Sizes */}
                <div className="flex flex-wrap gap-2">
                  <h2 className="text-xl font-semibold">Size:</h2>
                  {product?.size?.map((size, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        id={size}
                        className="hidden peer"
                        onChange={() => setSelectedSize(size)}
                              checked={selectedSize === size}
                      />
                      <label
                        htmlFor={size}
                        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md peer-checked:bg-[#00A63E] peer-checked:hover:bg-[#008f34] peer-checked:text-white cursor-pointer"
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
                </div>

                {/* Action buttons */}
                <div className="space-x-5 flex items-center">
                  <button
                    onClick={addToCartProduct}
                    type="button"
                    className="py-2 px-3 bg-[#00A63E] hover:bg-[#008f34] text-lg font-semibold rounded-md cursor-pointer text-white flex flex-nowrap items-center gap-2"
                  >
                    Add to Cart <RiShoppingCartLine size={20} />
                  </button>
                  <button
                    type="button"
                    className="py-3 px-3 bg-[#00A63E] hover:bg-[#008f34] text-lg font-semibold rounded-md cursor-pointer text-white flex flex-nowrap items-center gap-2"
                  >
                    <FaRegHeart size={20} />
                  </button>
                </div>
              </div>
            </div>

            <hr />

            {/* details */}
            <div className="min-h-screen w-full space-y-10">
              {/* Product Details */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      {product &&
                        Object.entries(product)?.map(([key, value]) => {
                          if (
                            key !== "image" &&
                            key !== "_id" &&
                            key !== "updatedAt" &&
                            value !== "" &&
                            value !== null &&
                            (typeof value === "string" ||
                              typeof value === "number")
                          ) {
                            return (
                              <TableRow key={key}>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {key.replace(/([A-Z])/g, " $1")}
                                </TableCell>
                                <TableCell sx={{ fontSize: "1.1rem" }}>
                                  {Array.isArray(value)
                                    ? value.join(", ")
                                    : value}
                                </TableCell>
                              </TableRow>
                            );
                          }
                          return null;
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* Reviews */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <h2 className="text-2xl font-semibold mb-4 col-span-full">
                  Product Reviews
                </h2>
                <div className="w-full overflow-y-auto max-h-[500px]">
                  <div className="space-y-4 h-full">
                    {product?.reviews ? (
                      product?.reviews?.map((review, index) => (
                        <Card
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            borderRadius: 2,
                          }}
                        >
                          {/* User Avatar */}
                          <Avatar
                            src={
                              "https://th.bing.com/th/id/OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw?rs=1&pid=ImgDetMain"
                            }
                            alt={"image"}
                            sx={{ width: 70, height: 70, mr: 2 }}
                          />

                          {/* Review Content */}
                          <CardContent sx={{ flex: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                              {review?.createdAt.split('T')[0]}
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 1 }}>
                              {review?.comment}
                            </Typography>

                            <Typography
                              variant="subtitle2"
                              color="green"
                              sx={{ mt: 1 }}
                            >
                              {review?.username}
                            </Typography>
                          </CardContent>

                          {/* Star Rating */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mr: 2,
                            }}
                          >
                            <Rating
                              name="read-only"
                              value={review.rating}
                              precision={0.1}
                              readOnly
                            />
                          </Box>
                        </Card>
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <h2 className="text-2xl font-semibold">
                          No reviews yet!
                        </h2>
                      </div>
                    )}
                  </div>
                </div>

                <ReviewForm userId={userData?._id} productId={id} getThisProduct={getThisProduct} />
              </div>

              {/* Related Products */}
              {relatedProducts && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Related Product
                  </h2>
                  <div className="relative w-full text-start">
                    <Swiper
                      modules={[Navigation]}
                      spaceBetween={10}
                      slidesPerView={1}
                      loop={true}
                      navigation={{
                        nextEl: ".custom-next2",
                        prevEl: ".custom-prev2",
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        1260: {
                          slidesPerView: 5,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {relatedProducts &&
                        relatedProducts?.map((product, index) => (
                          <SwiperSlide key={index}>
                            <ProductCard {...product} />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="custom-prev2">
                      <FaChevronLeft />
                    </div>
                    <div className="custom-next2">
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
