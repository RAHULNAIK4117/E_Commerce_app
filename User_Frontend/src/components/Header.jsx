import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaHeadphones,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 left-0 w-full z-50">
      <div className=" w-full flex items-center justify-between py-3 px-10">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/Logo.jpg" alt="Shopstic Logo" className="h-8" />
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search for items..."
            className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring focus:ring-green-300"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 cursor-pointer border py-2 px-2 border-gray-300 rounded-md">
          <IoLocationOutline className="text-gray-600 ml-2" />
          <select className="text-green-600 bg-transparent focus:outline-none">
            <option value="all">All</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="in">India</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="cn">China</option>
            <option value="br">Brazil</option>
            <option value="za">South Africa</option>
            <option value="ru">Russia</option>
            <option value="mx">Mexico</option>
            <option value="it">Italy</option>
            <option value="es">Spain</option>
            <option value="kr">South Korea</option>
            <option value="sa">Saudi Arabia</option>
            <option value="ae">United Arab Emirates</option>
            <option value="ng">Nigeria</option>
            <option value="eg">Egypt</option>
            <option value="tr">Turkey</option>
            <option value="ar">Argentina</option>
          </select>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer flex">
            <FaHeart className="text-gray-600 text-lg" />
            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-1 rounded-full">
              0
            </span>
            <span className="text-sm ml-1">Wishlist</span>
          </div>
          <div className="relative cursor-pointer flex">
            <FaShoppingCart className="text-gray-600 text-lg" />
            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-1 rounded-full">
              0
            </span>
            <span className="text-sm ml-1">Cart</span>
          </div>
          <div className="cursor-pointer flex items-center space-x-1">
            <FaUser className="text-gray-600 text-lg" />
            <span className="text-sm">Account</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t flex items-center py-2 px-10">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <MdMenu />
          <span>Browse All Categories</span>
        </button>
        <nav className="flex space-x-6 ml-6">
          <a href="#" className="hover:text-green-600">
            Home
          </a>
          <a href="#" className="hover:text-green-600">
            Fashion
          </a>
          <a href="#" className="hover:text-green-600">
            Electronics
          </a>
          <a href="#" className="hover:text-green-600">
            Bags
          </a>
          <a href="#" className="hover:text-green-600">
            Footwear
          </a>
          <a href="#" className="hover:text-green-600">
            Groceries
          </a>
          <a href="#" className="hover:text-green-600">
            Beauty
          </a>
          <a href="#" className="hover:text-green-600">
            Shop
          </a>
        </nav>
        <div className="ml-auto flex items-center space-x-2 text-green-600 font-bold">
          <FaHeadphones className="text-gray-600" />
          <span>1900 - 888</span>
          <span className="text-gray-500 text-sm">24/7 Support Center</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
