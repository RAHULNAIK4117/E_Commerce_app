import React from "react";

const MyAccount = () => {
  return (
    <div className="w-full flex items-center justify-center p-10">
      <div className="min-w-xl mx-auto p-6 bg-white shadow-md rounded-md ">
        <h2 className="text-2xl font-semibold mb-4">My Account</h2>
        <div className="flex mt-6">
          {/* Profile Image */}
          <div className="w-24 h-24 border-2 border-blue-600 rounded-full flex-shrink-0"></div>

          <div className="ml-6 w-full">
            {/* Name */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="text-sm font-semibold">Phone</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Save Button */}
            <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
