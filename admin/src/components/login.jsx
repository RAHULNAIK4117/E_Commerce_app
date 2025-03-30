import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { IoKeyOutline } from "react-icons/io5";
import { IoIosMail, IoIosLock } from "react-icons/io";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login-admin`, { email, password });

            // console.log({response});
            

            if (response.data.success) {
                setToken(response.data.token);
                toast.success("Login successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <motion.div
                className="w-full max-w-md bg-gray-800 bg-opacity-60 backdrop-blur-md text-white shadow-lg rounded-lg p-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center">
                    <IoKeyOutline className="text-blue-400 animate-spin-slow" style={{ fontSize: "40px" }} />
                    <h1 className="text-2xl font-semibold mt-3">Welcome Back!</h1>
                </div>

                <form onSubmit={onsubmitHandler} className="mt-6 space-y-6">
                    <div className="relative">
                        <IoIosMail className="absolute left-3 top-3 text-gray-400 text-xl" />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-500 focus:outline-none focus:ring-0 text-white placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <IoIosLock className="absolute left-3 top-3 text-gray-400 text-xl" />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-500 focus:outline-none focus:ring-0 text-white placeholder-gray-400"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded shadow-md transition-all"
                    >
                        Login
                    </motion.button>

                    <p className="text-center text-gray-400 text-sm mt-3 hover:underline cursor-pointer">
                        Forgot My Password
                    </p>

                    <div className="flex justify-center space-x-4 text-gray-400 text-xs mt-4">
                        <p className="hover:underline cursor-pointer">Terms of Use</p>
                        <span>|</span>
                        <p className="hover:underline cursor-pointer">Privacy Policy</p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
