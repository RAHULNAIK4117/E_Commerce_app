import React from "react";
import { NavLink } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { RiLuggageCartFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 p-4 text-[15px]">
        <NavLink
          to="/admin/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          <FaListUl className="w-5 h-5" />
          <p className="hidden md:block adminitemssection">list items</p>
        </NavLink>

        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          <MdAddCircleOutline className="w-5 h-5" />
          <p className="hidden md:block adminitemssection">add items</p>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md transition ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          <RiLuggageCartFill className="w-5 h-5" />
          <p className="hidden md:block adminitemssection">orders items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
