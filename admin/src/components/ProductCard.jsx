import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


// components/ProductCard.jsx
const ProductCard = ({ _id, image, title, price, rating, brand, category }) => {
  const navigate = useNavigate()
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 min-w-60 w-full hover:shadow-lg transition-shadow group">
      <div onClick={()=>navigate(`/product/${_id}`)} className="w-full h-60 relative rounded-md overflow-hidden cursor-pointer ">
        <div className="w-full h-full bg-gray-500/50 absolute top-0 left-0 items-center justify-center hidden group-hover:flex duration-150 ease-in-out opacity-0 group-hover:opacity-100 z-20">
          <div onClick={stopPropagation} className="flex items-center justify-center gap-4 bg-white p-2 rounded-md">
            <CiHeart className="hover:text-green-600" size={20} /> 
            <MdOutlineRemoveRedEye className="hover:text-green-600" size={20}/>
          </div>
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover object-top group-hover:scale-110 z-10 duration-150 ease-in-out"
        />
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-500 capitalize">{category}</p>
        <h3 className="font-semibold text-gray-800 text-lg truncate">
          {title}
        </h3>
        <div className="flex items-center my-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`text-yellow-500 text-sm ${
                index < rating ? "fill-current" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          By <span className="font-semibold text-green-600">{brand}</span>
        </p>
        <div className="flex items-center mt-2">
          <p className="text-lg font-bold text-green-600">Rs {price}</p>
          <p className="text-sm text-gray-500 line-through ml-2">
            Rs {price + 100}
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default ProductCard;
