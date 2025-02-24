import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaHeadphones,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  PersonOutlineOutlined,
  LocalShippingOutlined,
  FavoriteBorderOutlined,
  Logout,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {};

  return (
    <header className="bg-white shadow-sm sticky top-0 left-0 w-full z-50">
      <div className=" w-full flex items-center justify-between gap-4 py-3 px-4 md:px-10 ">
        {/* Logo */}
        <Link
          to="/"
          className="hidden sm:flex items-center space-x-2 flex-shrink-0"
        >
          <img src="/Logo.jpg" alt="Shopstic Logo" className="h-8" />
        </Link>

        <div className="flex items-center justify-end w-full gap-4 ">
          {/* Search Bar */}
          <div className="relative flex-grow max-w-lg flex-shrink-0">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring focus:ring-green-300"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>

          {/* Location */}
          <div className="hidden lg:flex items-center space-x-1 cursor-pointer border py-2 px-2 border-gray-300 rounded-md ">
            <IoLocationOutline size={20} className="text-gray-600 ml-2" />
            <select className="text-green-600 bg-transparent focus:outline-none cursor-pointer px-2">
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
          <div className="hidden md:flex items-center gap-2">
            <Button
              onClick={() => navigate("/wish-list")}
              sx={{ textTransform: "capitalize" }}
              variant="text"
              color="black"
              className="relative cursor-pointer flex"
            >
              <FaHeart className="text-gray-600 text-lg" />
              <span className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 rounded-full">
                0
              </span>
              <span className="text-sm ml-1">Wishlist</span>
            </Button>
            <Button
              onClick={() => navigate("/cart")}
              sx={{ textTransform: "capitalize" }}
              variant="text"
              color="black"
              className="relative cursor-pointer flex"
            >
              <FaShoppingCart className="text-gray-600 text-lg" />
              <span className="absolute top-0 left-0 bg-green-500 text-white text-xs px-1 rounded-full">
                0
              </span>
              <span className="text-sm ml-1">Cart</span>
            </Button>
            <div className="cursor-pointer flex items-center space-x-1">
              <span
                className="text-sm  flex whitespace-nowrap gap-1"
                onClick={handleClick}
              >
                <FaUser className="text-gray-600 text-lg" />
                Account
              </span>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/account");
                    handleClose();
                  }}
                  className=" flex whitespace-nowrap gap-1"
                >
                  <PersonOutlineOutlined /> My Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/orders");
                    handleClose();
                  }}
                  className=" flex whitespace-nowrap gap-1"
                >
                  <LocalShippingOutlined /> Orders
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/wish-list");
                    handleClose();
                  }}
                  className=" flex whitespace-nowrap gap-1"
                >
                  <FavoriteBorderOutlined /> My Wishlist
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogOut();
                    handleClose();
                  }}
                  className=" flex whitespace-nowrap gap-1"
                >
                  <Logout /> Logout
                </MenuItem>
              </Menu>
            </div>
          </div>

          <button className="md:hidden cursor-pointer">
            {isMenuOpen ? (
              <IoMdClose
                onClick={() => setIsMenuOpen((state) => !state)}
                size={28}
              />
            ) : (
              <HiMenu
                onClick={() => setIsMenuOpen((state) => !state)}
                size={28}
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } bg-white shadow-md md:hidden w-full absolute top-16 left-0 p-4 border-t`}
        >
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <div onClick={()=>{
              navigate("/")
              setIsMenuOpen(false)
            }} className=" flex cursor-pointer items-center space-x-2 flex-shrink-0">
              <img src="/Logo.jpg" alt="Shopstic Logo" className="h-7" />
            </div>

            {/* Location */}
            <div className="flex items-center cursor-pointer border py-2 px-2 border-gray-300 rounded-md ">
              <IoLocationOutline size={20} className="text-gray-600 " />
              <select className="bg-transparent focus:outline-none cursor-pointer w-32 ">
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
          </div>
          <div className="font-semibold grid grid-cols-2 gap-2 mt-4 ">
            <button
            onClick={()=> {
              navigate("/account")
              setIsMenuOpen(false)
            }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              My Account
            </button>
            <button
            onClick={()=> {
              navigate("/cart")
              setIsMenuOpen(false)
            }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              Carts
            </button>
            <button
            onClick={()=> {
              navigate("/orders")
              setIsMenuOpen(false)
            }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              Orders
            </button>
            <button
            onClick={()=> {
              navigate("/wish-list")
              setIsMenuOpen(false)
            }}
              className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite "
            >
              My Wishlist
            </button>
            <button onClick={handleLogout} className="block cursor-pointer py-2 bg-zinc-300 text-center rounded-md textwhite ">
              Logout
            </button>
          </div>
          <div className="">

          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="hidden md:flex border-t items-center py-2 px-10">
        <button className="bg-green-600 text-white px-4 py-1 rounded-md flex items-center space-x-2 cursor-pointer">
          <MdMenu />
          <span>Browse All Categories</span>
        </button>
        <nav className="flex space-x-6 ml-6">
          <Button
            onClick={() => navigate("/")}
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize"
          >
            Home
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Fashion <KeyboardArrowDownOutlined />
            <ul className="absolute top-full left-0 bg-white min-w-40 flex-col items-start shadow-md shadow-gray-700 rounded hidden duration-150 py-4 group-hover:flex">
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                men
              </li>
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                women
              </li>
            </ul>
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Electronics <KeyboardArrowDownOutlined />
            <ul className="absolute top-full left-0 bg-white min-w-40 flex-col items-start shadow-md shadow-gray-700 rounded hidden duration-150 py-4 group-hover:flex">
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                smart watch accesories
              </li>
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                laptops
              </li>
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                camera
              </li>
            </ul>
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Bags <KeyboardArrowDownOutlined />
            <ul className="absolute top-full left-0 bg-white min-w-40 flex-col items-start shadow-md shadow-gray-700 rounded hidden duration-150 py-4 group-hover:flex">
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                men bags
              </li>
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                women bags
              </li>
            </ul>
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize group"
          >
            Footwear <KeyboardArrowDownOutlined />
            <ul className="absolute top-full left-0 bg-white min-w-40 flex-col items-start shadow-md shadow-gray-700 rounded hidden duration-150 py-4 group-hover:flex">
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                men footware
              </li>
              <li className="px-5 py-1 hover:bg-gray-200 w-full text-start whitespace-nowrap">
                women footware
              </li>
            </ul>
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize"
          >
            Groceries
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="text"
            color="black"
            className="hover:text-green-600 capitalize"
          >
            Beauty
          </Button>
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
