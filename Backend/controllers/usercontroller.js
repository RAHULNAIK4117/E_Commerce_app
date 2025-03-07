import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/usermodel.js";

// Route for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Route for user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol" 
            });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Route for admin login
export const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if admin exists
        const admin = await userModel.findOne({ email, role: "admin" });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, message: "Admin login successful", admin });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
