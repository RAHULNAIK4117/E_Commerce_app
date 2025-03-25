import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAddCircleOutline } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { RiLuggageCartFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-4 pl-[28%] text-[15px]'>
            <NavLink to='/add' className='flex items-center gap-3 border-r-0 px-3 py-2 rounded-1'>
            <MdAddCircleOutline className='w-5 h-5' />
            <p className='hidden md:block'>add items</p>

            </NavLink>
            <NavLink to='/list' className='flex items-center gap-3 border-r-0 px-3 py-2 rounded-1'>
            <FaListUl className='w-5 h-5' />
            <p className='hidden md:block'>list items</p>

            </NavLink>
            <NavLink to='/orders' className='flex items-center gap-3 border-r-0 px-3 py-2 rounded-1'>
            <RiLuggageCartFill className='w-5 h-5' />
            <p className='hidden md:block'>orders items</p>

            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
