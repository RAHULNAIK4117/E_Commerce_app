import { Link } from "react-router-dom";

const categories = [
  {
    title: "Fashion",
    url: "/products?category=fashion",
    image: "https://api.spicezgold.com/download/file_1734525204708_fash.png",
    bgColor: "#E6F4EA",
  },
  {
    title: "Electronics",
    url: "/products?category=electronics",
    image: "https://api.spicezgold.com/download/file_1734525218436_ele.png",
    bgColor: "#FCEAFF",
  },
  {
    title: "Bags",
    url: "/products?category=bags",
    image: "https://api.spicezgold.com/download/file_1734525231018_bag.png",
    bgColor: "#FFE6E6",
  },
  {
    title: "Footwear",
    url: "/products?category=footwear",
    image: "https://api.spicezgold.com/download/file_1734525239704_foot.png",
    bgColor: "#E6F0FF",
  },
  {
    title: "Groceries",
    url: "/products?category=groceries",
    image: "https://api.spicezgold.com/download/file_1734525248057_gro.png",
    bgColor: "#FFE6FF",
  },
  {
    title: "Beauty",
    url: "/products?category=beauty",
    image: "https://api.spicezgold.com/download/file_1734525255799_beauty.png",
    bgColor: "#E6F4EA",
  },
  {
    title: "Wellness",
    url: "/products?category=wellness",
    image: "https://api.spicezgold.com/download/file_1734525275367_well.png",
    bgColor: "#FFF3E6",
  },
  {
    title: "Jewellery",
    url: "/products?category=jewellery",
    image: "https://api.spicezgold.com/download/file_1734525286186_jw.png",
    bgColor: "#FDE7E7",
  },
];

// components/CategoryCard.jsx
const CategoryCard = ({ image, title, url, bgColor }) => {
  return (
    <Link to={url}
      className={`flex flex-col items-center justify-center w-24 h-24  md:w-32 md:h-32 rounded-lg md:rounded-full shadow-md transition-transform transform hover:scale-110 cursor-pointer`}
      style={{ backgroundColor: bgColor }}
    >
      <img src={image} alt={title} className="w-10 h-10 md:w-16 md:h-16" />
      <p className="mt-2 text-sm font-semibold">{title}</p>
    </Link>
  );
};

const FeaturedCategories = () => {
  return (
    <div className="my-10 w-full px-4 md:px-10">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-6">
        Featured Categories
      </h2>
      <div className="flex flex-wrap justify-between gap-4 w-full md:px-10">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            image={category.image}
            url={category.url}
            bgColor={category.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
