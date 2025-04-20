import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // console.log({ name, email, password });

  try {
    const checkUser = await User.findOne({ email });
    // console.log(checkUser.response.data);
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" }
    );

    await user.save();

    res.status(200).json({
      success: true,
      token,
      message: "Registration successfull :)",
    });
  } catch (error) {
    console.log("Registration failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    //     // console.log(user);

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    // res.cookie("token", token, { httpOnly: true, secure: false }).json({
    //     success: true,
    //     message: "Login successfull :)",
    //     data: {
    //         id: user._id,
    //         email: user.email,
    //         role: user.role,
    //         name: user.name
    //     }
    // })

    res.status(200).json({
      success: true,
      message: "Login successfull :)",
      token,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Login failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
};

// logout
const logoutUser = (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "Authenticated User!",
      user,
    });
  } catch (error) {
    console.log("Get user details failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = req.body;

    if (userDetails.password) {
      userDetails.password = await bcrypt.hash(userDetails.password, 12);
    }

    // console.log({ userDetails });

    const user = User.findByIdAndUpdate(userId, userDetails, { new: true });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log("Update user details failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    const isAdmin = user.role === "admin";
    if (!isAdmin) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    //     // console.log(user);

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfull :)",
      token,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Login failed :: ", error);
    res.status(500).json({
      success: false,
      message: "something went wrong...",
    });
  }
};



export { registerUser, loginUser, logoutUser, getUserDetails, updateUser, loginAdmin };
