import React from 'react'

const AddressForm = () => {
  return (
    <div className="col-span-2 p-6 bg-white text-black rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">BILLING DETAILS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Country *"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="House number and street name *"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mt-2">
        <input
          type="text"
          placeholder="Apartment, suite, unit, etc. (optional)"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Town / City *"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="State / County *"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Postcode / ZIP *"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          placeholder="Phone Number"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  )
}

export default AddressForm