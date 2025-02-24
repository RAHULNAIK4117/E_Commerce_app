// components/ProductList.jsx
import ProductCard from "./ProductCard";

const products = [
  {
    image: "https://api.spicezgold.com/download/file_1734529005315_glito-black-solid-dry-fit-regular-fit-sports-wear-jacket-upper-for-men-product-images-rvtxobckuy-0-202303140932.webp",
    title: "Glito Black Solid Dry-Fit...",
    price: 460,
    oldPrice: 490,
    rating: 5,
    brand: "V-Mart",
  },
  {
    image: "https://api.spicezgold.com/download/file_1734529066472_1000014029787-Green-GREEN-1000014029787_01-2100.jpg",
    title: "Black solid casual shirt...",
    price: 459,
    oldPrice: 495,
    rating: 4,
    brand: "V-Mart",
  },
  {
    image: "https://api.spicezgold.com/download/file_1734526678422_tazo-mens-round-neck-colourblocked-full-sleeve-dryfit-gymwear-tshirt-product-images-rvzwdw4nio-0-202404101341.webp",
    title: "VNEED Women Embroider...",
    price: 450,
    oldPrice: 490,
    rating: 4,
    brand: "VNEED",
  },
  {
    image: "https://api.spicezgold.com/download/file_1734526702388_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-0-202304131033.jpg",
    title: "Sheetal Cotton Pink Saree",
    price: 500,
    oldPrice: 650,
    rating: 5,
    brand: "SIRIL",
  },
  {
    image: "https://api.spicezgold.com/download/file_1734526809409_need-printed-cotton-straight-kurtis-for-women-fancy-kurti-for-girls-regular-office-college-wear-kurta-for-ladies-kurti-pant-set-of-1-size-l-product-images-rvyi2nw7q6-0-202408011909.jpg",
    title: "Altecia Tie and Dye Jogger...",
    price: 1500,
    oldPrice: 1800,
    rating: 4,
    brand: "Altecia",
  },
];

const PopularProducts = () => {
  return (
    <div className=" my-10 w-full px-4 md:px-10 py-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-6 ">Popular Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
