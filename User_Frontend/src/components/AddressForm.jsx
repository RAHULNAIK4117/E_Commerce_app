import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../redux/addressSlice";

const AddressForm = () => {
  const userData = useSelector((state) => state.auth.userData);
  const address = useSelector((state) => state.address.address);
  const [activeSaveButton, setActiveSaveButton] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  function isFormDataEqual() {
    return Object.keys(form).every((key) => form[key] === address?.[key]);
  }

  useEffect(() => {
    setActiveSaveButton(!isFormDataEqual());
  }, [address, Object.values(form)]);

  useEffect(() => {
    if (address) {
      setForm((prevForm) => ({
        ...prevForm,
        ...address,
      }));
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) =>
      prevForm[name] !== value ? { ...prevForm, [name]: value } : prevForm
    );
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    // console.log("Address saved", { ...form, user: userData?._id });
    dispatch(addAddress({ ...form, user: userData?._id }));
  };

  return (
    <form onSubmit={saveAddress}>
      <div className="col-span-2 p-6 bg-white text-black rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">BILLING DETAILS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number *"
              value={form.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="">
            <input
              type="text"
              name="country"
              placeholder="Country *"
              value={form.country}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}
          </div>
        </div>

        <div className="mt-4">
          <input
            type="text"
            name="street"
            placeholder="House number and street name *"
            value={form.street}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
          {errors.street && <p className="text-red-500">{errors.street}</p>}
        </div>

        <div className="mt-2">
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            name="city"
            placeholder="Town / City *"
            value={form.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}
        </div>

        <div className="mt-4">
          <input
            type="text"
            name="state"
            placeholder="State / County *"
            value={form.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>

        <div className="mt-4">
          <input
            type="text"
            name="postcode"
            placeholder="Postcode / ZIP *"
            value={form.postcode}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
          />
          {errors.postcode && <p className="text-red-500">{errors.postcode}</p>}
        </div>

        <div className=" flex justify-end mt-5">
          <button
            type="submit"
            className={`text-lg px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white cursor-pointer font-semibold ${
              activeSaveButton ? "opacity-100" : "opacity-50"
            }`}
          >
            Save Address
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
