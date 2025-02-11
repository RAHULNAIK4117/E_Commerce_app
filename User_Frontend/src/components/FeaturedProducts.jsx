import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const products = [
  {
    category: "Footwear",
    name: "Men Round Toe Lace-Up",
    price: 1200,
    oldPrice: 1450,
    rating: 5,
    image:
      "https://api.spicezgold.com/download/file_1734529005315_glito-black-solid-dry-fit-regular-fit-sports-wear-jacket-upper-for-men-product-images-rvtxobckuy-0-202303140932.webp",
    brand: "adeboy",
  },
  {
    category: "Footwear",
    name: "Men Colourblocked Suede",
    price: 1800,
    oldPrice: 1900,
    rating: 3,
    image:
      "https://api.spicezgold.com/download/file_1734529066472_1000014029787-Green-GREEN-1000014029787_01-2100.jpg",
    brand: "ASTEROID",
  },
  {
    category: "Electronics",
    name: "Motorola Edge 50 Fusion 5G",
    price: 22490,
    oldPrice: 23999,
    rating: 4,
    image:
      "https://api.spicezgold.com/download/file_1734526678422_tazo-mens-round-neck-colourblocked-full-sleeve-dryfit-gymwear-tshirt-product-images-rvzwdw4nio-0-202404101341.webp",
    brand: "Motorola",
  },
  {
    category: "Electronics",
    name: "OnePlus Nord CE 3 Lite 5G",
    price: 15490,
    oldPrice: 17490,
    rating: 4,
    image:
      "https://api.spicezgold.com/download/file_1734526702388_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-0-202304131033.jpg",
    brand: "One Plus",
  },
  {
    category: "Electronics",
    name: "OnePlus Nord CE 3 Lite 5G",
    price: 15490,
    oldPrice: 17490,
    rating: 4,
    image:
      "https://api.spicezgold.com/download/file_1734526702388_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-0-202304131033.jpg",
    brand: "One Plus",
  },
  {
    category: "Electronics",
    name: "OnePlus Nord CE 3 Lite 5G",
    price: 15490,
    oldPrice: 17490,
    rating: 4,
    image:
      "https://api.spicezgold.com/download/file_1734526702388_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-0-202304131033.jpg",
    brand: "One Plus",
  },
];

const FeaturedProducts = () => {
  return (
    <div className="flex items-end space-x-6 px-10 py-5">
      {/* Swiper Section */}
      <div className="w-3/4 ">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="relative w-full ">
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={4}
            loop={true}
            navigation={{ nextEl: ".custom-next2", prevEl: ".custom-prev2" }}
            className=""
          >
            {products.map((product, index) => (
              <SwiperSlide key={index} className="p-2">
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

      {/* Image Section */}
      <div className="w-1/4 h-[388px] select-none">
        <img
          src="https://api.spicezgold.com/download/file_1734526702388_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-0-202304131033.jpg"
          alt="Super Grocery Sale"
          className="object-cover h-full w-full aspect-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
