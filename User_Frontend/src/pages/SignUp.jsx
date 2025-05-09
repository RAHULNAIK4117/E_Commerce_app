import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authServices";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setLoading(true)

    const response = await signUp(formData);
    // console.log(response);

    if (response.success) {
      localStorage.setItem("token", response.token);
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }

    setLoading(false)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 select-none">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="relative">
            <input
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 mt-6 rounded-md hover:bg-green-600  cursor-pointer"
          >
           {loading ? <LuLoaderCircle size={20} className={`animate-spin mx-auto`} /> : "Sign Up"}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <FcGoogle className="mr-2" size={22} />
          Sign in with Google
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="text-blue-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
