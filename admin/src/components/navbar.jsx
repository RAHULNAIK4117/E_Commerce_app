import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between sticky top-0 bg-white shadow'>
        <img src={assets.adminlogo} alt="Admin Logo" className='w-[max(5%,40px)]' />
        <button 
            onClick={() => setToken('')} 
            className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer logout'
        >
            Logout
        </button>
    </div>
  );
};

export default Navbar;
